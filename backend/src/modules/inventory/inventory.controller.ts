import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  CreateInventoryItemDto,
  UpdateInventoryItemDto,
  InventoryResponseDto,
} from '../../common/dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createInventoryDto: CreateInventoryItemDto,
  ): Promise<InventoryResponseDto> {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  async findAll(): Promise<InventoryResponseDto[]> {
    return this.inventoryService.findAll();
  }

  @Get('low-stock')
  async getLowStockItems(
    @Query('threshold') threshold?: string,
  ): Promise<InventoryResponseDto[]> {
    const thresholdNum = threshold ? parseInt(threshold) : 10;
    return this.inventoryService.getLowStockItems(thresholdNum);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string): Promise<InventoryResponseDto[]> {
    return this.inventoryService.findByCategory(category);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<InventoryResponseDto> {
    return this.inventoryService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateInventoryDto: UpdateInventoryItemDto,
  ): Promise<InventoryResponseDto> {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.inventoryService.delete(id);
  }
}
