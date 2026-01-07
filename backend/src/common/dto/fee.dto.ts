import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsDate } from 'class-validator';
import { FeeType, FeeStatus } from '../../entities';

export class CreateFeeDto {
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(FeeType)
  @IsOptional()
  type?: FeeType;

  @IsNotEmpty()
  dueDate: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateFeeDto {
  @IsOptional()
  @IsNumber()
  amountPaid?: number;

  @IsOptional()
  @IsEnum(FeeStatus)
  status?: FeeStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class FeeResponseDto {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  amountPaid: number;
  type: FeeType;
  status: FeeStatus;
  dueDate: Date;
  paidDate?: Date;
  notes?: string;
  createdAt: Date;
}
