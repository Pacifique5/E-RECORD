import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsInt, Min, Max, Matches } from 'class-validator';
import { PaymentMethod, PayrollStatus } from '../../entities';
import { SchoolTerm } from '../academic';

export class CreatePayrollDto {
  @IsString()
  @Matches(/^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/, { message: 'Enter the staff name' })
  staffName: string;

  @IsString()
  @IsNotEmpty()
  staffId: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsNumber()
  @Min(0)
  baseSalary: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  allowances?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  deductions?: number;

  @IsNumber()
  @Min(0)
  netSalary: number;

  @IsOptional()
  @IsInt()
  @Min(2020)
  @Max(2035)
  academicYear?: number;

  @IsOptional()
  @IsEnum(SchoolTerm)
  term?: SchoolTerm;

  @IsNotEmpty()
  payrollMonth: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
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

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
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
  paymentMethod?: PaymentMethod;
  academicYear: number;
  term: SchoolTerm;
  createdAt: Date;
}
