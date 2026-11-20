import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { ExpenseCategory } from '../../entities';
import { SchoolTerm } from '../academic';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1, { message: 'Amount must be greater than 0' })
  amount: number;

  @IsOptional()
  @IsInt()
  @Min(2020)
  @Max(2035)
  academicYear?: number;

  @IsOptional()
  @IsEnum(SchoolTerm)
  term?: SchoolTerm;

  @IsEnum(ExpenseCategory)
  @IsOptional()
  category?: ExpenseCategory;

  @IsNotEmpty()
  date: Date;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateExpenseDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;

  @IsOptional()
  @IsInt()
  @Min(2020)
  @Max(2035)
  academicYear?: number;

  @IsOptional()
  @IsEnum(SchoolTerm)
  term?: SchoolTerm;

  @IsOptional()
  @IsEnum(ExpenseCategory)
  category?: ExpenseCategory;

  @IsOptional()
  notes?: string;
}

export class ExpenseResponseDto {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  vendor?: string;
  invoiceNumber?: string;
  notes?: string;
  academicYear: number;
  term: SchoolTerm;
  createdAt: Date;
}
