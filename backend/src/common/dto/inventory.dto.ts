import { IsNotEmpty, IsNumber, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateInventoryItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitCost: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  supplier?: string;
}

export class UpdateInventoryItemDto {
  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  unitCost?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  supplier?: string;
}

export class InventoryResponseDto {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unitCost: number;
  totalValue: number;
  location?: string;
  description?: string;
  supplier?: string;
  isActive: boolean;
  createdAt: Date;
}
