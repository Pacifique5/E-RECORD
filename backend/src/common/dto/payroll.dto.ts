import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { PayrollStatus } from '../../entities';

export class CreatePayrollDto {
  @IsString()
  @IsNotEmpty()
  staffName: string;

  @IsString()
  @IsNotEmpty()
  staffId: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsNumber()
  @IsNotEmpty()
  baseSalary: number;

  @IsOptional()
  @IsNumber()
  allowances?: number;

  @IsOptional()
  @IsNumber()
  deductions?: number;

  @IsNumber()
  @IsNotEmpty()
  netSalary: number;

  @IsNotEmpty()
  payrollMonth: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdatePayrollDto {
  @IsOptional()
  @IsNumber()
  allowances?: number;

  @IsOptional()
  @IsNumber()
  deductions?: number;

  @IsOptional()
  @IsNumber()
  netSalary?: number;

  @IsOptional()
  @IsEnum(PayrollStatus)
  status?: PayrollStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class PayrollResponseDto {
  id: string;
  staffName: string;
  staffId: string;
  position?: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payrollMonth: Date;
  status: PayrollStatus;
  paidDate?: Date;
  notes?: string;
  createdAt: Date;
}
