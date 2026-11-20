import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../../entities/inventory.entity';
import { User } from '../../entities/user.entity';
import {
  CreateInventoryItemDto,
  UpdateInventoryItemDto,
  InventoryResponseDto,
} from '../../common/dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private inventoryRepository: Repository<InventoryItem>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async schoolId(userId: string): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['school'] });
    return user?.school?.id || null;
  }

  async create(
    createInventoryDto: CreateInventoryItemDto,
    userId: string,
  ): Promise<InventoryResponseDto> {
    const school = await this.userRepository.findOne({ where: { id: userId }, relations: ['school'] });
    if (!school?.school) throw new BadRequestException('This account is not linked to a school');
    const totalValue = createInventoryDto.quantity * createInventoryDto.unitCost;

    const item = this.inventoryRepository.create({
      ...createInventoryDto,
      totalValue,
      school: school.school,
    });

    await this.inventoryRepository.save(item);
    return this.toResponseDto(item);
  }

  async findAll(userId: string): Promise<InventoryResponseDto[]> {
    const id = await this.schoolId(userId);
    if (!id) return [];
    const items = await this.inventoryRepository.find({
      where: { isActive: true, school: { id } },
    });
    return items.map((item) => this.toResponseDto(item));
  }

  async findById(id: string, userId: string): Promise<InventoryResponseDto> {
    const school = await this.schoolId(userId);
    const item = await this.inventoryRepository.findOne({
      where: school ? { id, isActive: true, school: { id: school } } : { id: '00000000-0000-0000-0000-000000000000' },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return this.toResponseDto(item);
  }

  async findByCategory(category: string, userId: string): Promise<InventoryResponseDto[]> {
    const id = await this.schoolId(userId);
    if (!id) return [];
    const items = await this.inventoryRepository.find({
      where: { category, isActive: true, school: { id } },
    });
    return items.map((item) => this.toResponseDto(item));
  }

  async update(
    id: string,
    updateInventoryDto: UpdateInventoryItemDto,
    userId: string,
  ): Promise<InventoryResponseDto> {
    const school = await this.schoolId(userId);
    const item = await this.inventoryRepository.findOne({
      where: school ? { id, isActive: true, school: { id: school } } : { id: '00000000-0000-0000-0000-000000000000' },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }

    Object.assign(item, updateInventoryDto);

    // Recalculate total value
    if (updateInventoryDto.quantity || updateInventoryDto.unitCost) {
      const quantity = updateInventoryDto.quantity ?? item.quantity;
      const unitCost = updateInventoryDto.unitCost ?? item.unitCost;
      item.totalValue = quantity * unitCost;
    }

    await this.inventoryRepository.save(item);
    return this.toResponseDto(item);
  }

  async delete(id: string, userId: string): Promise<{ message: string }> {
    const school = await this.schoolId(userId);
    const item = await this.inventoryRepository.findOne({
      where: school ? { id, isActive: true, school: { id: school } } : { id: '00000000-0000-0000-0000-000000000000' },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }

    item.isActive = false;
    await this.inventoryRepository.save(item);
    return { message: 'Inventory item deleted successfully' };
  }

  async getLowStockItems(userId: string, threshold: number = 10): Promise<InventoryResponseDto[]> {
    const id = await this.schoolId(userId);
    if (!id) return [];
    const items = await this.inventoryRepository.find({
      where: { isActive: true, school: { id } },
    });
    return items
      .filter((item) => item.quantity <= threshold)
      .map((item) => this.toResponseDto(item));
  }

  private toResponseDto(item: InventoryItem): InventoryResponseDto {
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      sku: item.sku,
      quantity: item.quantity,
      unitCost: item.unitCost,
      totalValue: item.totalValue,
      location: item.location,
      description: item.description,
      supplier: item.supplier,
      isActive: item.isActive,
      createdAt: item.createdAt,
    };
  }
}
