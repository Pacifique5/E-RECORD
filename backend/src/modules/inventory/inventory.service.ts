import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../../entities/inventory.entity';
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
  ) {}

  async create(
    createInventoryDto: CreateInventoryItemDto,
  ): Promise<InventoryResponseDto> {
    const totalValue = createInventoryDto.quantity * createInventoryDto.unitCost;

    const item = this.inventoryRepository.create({
      ...createInventoryDto,
      totalValue,
    });

    await this.inventoryRepository.save(item);
    return this.toResponseDto(item);
  }

  async findAll(): Promise<InventoryResponseDto[]> {
    const items = await this.inventoryRepository.find({
      where: { isActive: true },
    });
    return items.map((item) => this.toResponseDto(item));
  }

  async findById(id: string): Promise<InventoryResponseDto> {
    const item = await this.inventoryRepository.findOne({
      where: { id, isActive: true },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return this.toResponseDto(item);
  }

  async findByCategory(category: string): Promise<InventoryResponseDto[]> {
    const items = await this.inventoryRepository.find({
      where: { category, isActive: true },
    });
    return items.map((item) => this.toResponseDto(item));
  }

  async update(
    id: string,
    updateInventoryDto: UpdateInventoryItemDto,
  ): Promise<InventoryResponseDto> {
    const item = await this.inventoryRepository.findOne({
      where: { id, isActive: true },
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

  async delete(id: string): Promise<{ message: string }> {
    const item = await this.inventoryRepository.findOne({
      where: { id, isActive: true },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }

    item.isActive = false;
    await this.inventoryRepository.save(item);
    return { message: 'Inventory item deleted successfully' };
  }

  async getLowStockItems(threshold: number = 10): Promise<InventoryResponseDto[]> {
    const items = await this.inventoryRepository.find({
      where: { isActive: true },
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
