import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee } from '../../entities/fee.entity';
import { Expense } from '../../entities/expense.entity';
import { Payroll } from '../../entities/payroll.entity';
import {
  CreateFeeDto,
  UpdateFeeDto,
  FeeResponseDto,
  CreateExpenseDto,
  UpdateExpenseDto,
  ExpenseResponseDto,
  CreatePayrollDto,
  UpdatePayrollDto,
  PayrollResponseDto,
} from '../../common/dto';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
  ) {}

  // FEE METHODS
  async createFee(createFeeDto: CreateFeeDto): Promise<FeeResponseDto> {
    const fee = this.feeRepository.create(createFeeDto);
    await this.feeRepository.save(fee);
    return this.toFeeResponseDto(fee);
  }

  async getAllFees(): Promise<FeeResponseDto[]> {
    const fees = await this.feeRepository.find();
    return fees.map((fee) => this.toFeeResponseDto(fee));
  }

  async getFeeById(id: string): Promise<FeeResponseDto> {
    const fee = await this.feeRepository.findOne({ where: { id } });
    if (!fee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }
    return this.toFeeResponseDto(fee);
  }

  async updateFee(id: string, updateFeeDto: UpdateFeeDto): Promise<FeeResponseDto> {
    const fee = await this.feeRepository.findOne({ where: { id } });
    if (!fee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }

    Object.assign(fee, updateFeeDto);
    await this.feeRepository.save(fee);
    return this.toFeeResponseDto(fee);
  }

  async deleteFee(id: string): Promise<{ message: string }> {
    const fee = await this.feeRepository.findOne({ where: { id } });
    if (!fee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }

    await this.feeRepository.remove(fee);
    return { message: 'Fee deleted successfully' };
  }

  // EXPENSE METHODS
  async createExpense(createExpenseDto: CreateExpenseDto): Promise<ExpenseResponseDto> {
    const expense = this.expenseRepository.create(createExpenseDto);
    await this.expenseRepository.save(expense);
    return this.toExpenseResponseDto(expense);
  }

  async getAllExpenses(): Promise<ExpenseResponseDto[]> {
    const expenses = await this.expenseRepository.find();
    return expenses.map((expense) => this.toExpenseResponseDto(expense));
  }

  async getExpenseById(id: string): Promise<ExpenseResponseDto> {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return this.toExpenseResponseDto(expense);
  }

  async updateExpense(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    Object.assign(expense, updateExpenseDto);
    await this.expenseRepository.save(expense);
    return this.toExpenseResponseDto(expense);
  }

  async deleteExpense(id: string): Promise<{ message: string }> {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    await this.expenseRepository.remove(expense);
    return { message: 'Expense deleted successfully' };
  }

  // PAYROLL METHODS
  async createPayroll(createPayrollDto: CreatePayrollDto): Promise<PayrollResponseDto> {
    const payroll = this.payrollRepository.create(createPayrollDto);
    await this.payrollRepository.save(payroll);
    return this.toPayrollResponseDto(payroll);
  }

  async getAllPayrolls(): Promise<PayrollResponseDto[]> {
    const payrolls = await this.payrollRepository.find();
    return payrolls.map((payroll) => this.toPayrollResponseDto(payroll));
  }

  async getPayrollById(id: string): Promise<PayrollResponseDto> {
    const payroll = await this.payrollRepository.findOne({ where: { id } });
    if (!payroll) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }
    return this.toPayrollResponseDto(payroll);
  }

  async updatePayroll(
    id: string,
    updatePayrollDto: UpdatePayrollDto,
  ): Promise<PayrollResponseDto> {
    const payroll = await this.payrollRepository.findOne({ where: { id } });
    if (!payroll) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }

    Object.assign(payroll, updatePayrollDto);
    await this.payrollRepository.save(payroll);
    return this.toPayrollResponseDto(payroll);
  }

  async deletePayroll(id: string): Promise<{ message: string }> {
    const payroll = await this.payrollRepository.findOne({ where: { id } });
    if (!payroll) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }

    await this.payrollRepository.remove(payroll);
    return { message: 'Payroll deleted successfully' };
  }

  private toFeeResponseDto(fee: Fee): FeeResponseDto {
    return {
      id: fee.id,
      studentName: fee.studentName,
      studentId: fee.studentId,
      amount: fee.amount,
      amountPaid: fee.amountPaid,
      type: fee.type,
      status: fee.status,
      dueDate: fee.dueDate,
      paidDate: fee.paidDate,
      notes: fee.notes,
      createdAt: fee.createdAt,
    };
  }

  private toExpenseResponseDto(expense: Expense): ExpenseResponseDto {
    return {
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      vendor: expense.vendor,
      invoiceNumber: expense.invoiceNumber,
      notes: expense.notes,
      createdAt: expense.createdAt,
    };
  }

  private toPayrollResponseDto(payroll: Payroll): PayrollResponseDto {
    return {
      id: payroll.id,
      staffName: payroll.staffName,
      staffId: payroll.staffId,
      position: payroll.position,
      baseSalary: payroll.baseSalary,
      allowances: payroll.allowances,
      deductions: payroll.deductions,
      netSalary: payroll.netSalary,
      payrollMonth: payroll.payrollMonth,
      status: payroll.status,
      paidDate: payroll.paidDate,
      notes: payroll.notes,
      createdAt: payroll.createdAt,
    };
  }
}
