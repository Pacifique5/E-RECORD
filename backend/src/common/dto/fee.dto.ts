import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsInt, Min, Max, Matches } from 'class-validator';
import { FeeType, FeeStatus, PaymentMethod } from '../../entities';
import { SchoolTerm } from '../academic';

export class CreateFeeDto {
  @IsString()
  @Matches(/^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/, { message: 'Enter the student name' })
  studentName: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

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

  @IsEnum(FeeType)
  @IsOptional()
  type?: FeeType;

  @IsNotEmpty()
  dueDate: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}

export class UpdateFeeDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  amountPaid?: number;

  @IsOptional()
  @IsInt()
  @Min(2020)
  @Max(2035)
  academicYear?: number;

  @IsOptional()
  @IsEnum(SchoolTerm)
  term?: SchoolTerm;

  @IsOptional()
  @IsEnum(FeeStatus)
  status?: FeeStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
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
  paymentMethod?: PaymentMethod;
  academicYear: number;
  term: SchoolTerm;
  createdAt: Date;
}
