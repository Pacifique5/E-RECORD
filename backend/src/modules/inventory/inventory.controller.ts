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
  Req,
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
    @Req() req: { user: { userId: string } },
  ): Promise<InventoryResponseDto> {
    return this.inventoryService.create(createInventoryDto, req.user.userId);
  }

  @Get()
  async findAll(@Req() req: { user: { userId: string } }): Promise<InventoryResponseDto[]> {
    return this.inventoryService.findAll(req.user.userId);
  }

  @Get('low-stock')
  async getLowStockItems(
    @Req() req: { user: { userId: string } },
    @Query('threshold') threshold?: string,
  ): Promise<InventoryResponseDto[]> {
    const thresholdNum = threshold ? parseInt(threshold) : 10;
    return this.inventoryService.getLowStockItems(req.user.userId, thresholdNum);
  }

  @Get('category/:category')
  async findByCategory(
    @Param('category') category: string,
    @Req() req: { user: { userId: string } },
  ): Promise<InventoryResponseDto[]> {
    return this.inventoryService.findByCategory(category, req.user.userId);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
  ): Promise<InventoryResponseDto> {
    return this.inventoryService.findById(id, req.user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateInventoryDto: UpdateInventoryItemDto,
    @Req() req: { user: { userId: string } },
  ): Promise<InventoryResponseDto> {
    return this.inventoryService.update(id, updateInventoryDto, req.user.userId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
  ): Promise<{ message: string }> {
    return this.inventoryService.delete(id, req.user.userId);
  }
}
