import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicQuery, inPeriod, termFromMonth } from '../../common/academic';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee } from '../../entities/fee.entity';
import { Expense } from '../../entities/expense.entity';
import { Payroll } from '../../entities/payroll.entity';
import { User } from '../../entities/user.entity';
import { School } from '../../entities/school.entity';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async schoolFor(userId: string): Promise<School | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['school'],
    });
    return user?.school || null;
  }

  private async requireSchool(userId: string): Promise<School> {
    const school = await this.schoolFor(userId);
    if (!school) throw new BadRequestException('This account is not linked to a school');
    return school;
  }

  // FEE METHODS
  async createFee(createFeeDto: CreateFeeDto, userId: string): Promise<FeeResponseDto> {
    const due = new Date(createFeeDto.dueDate);
    if (Number.isNaN(due.getTime())) throw new BadRequestException('Enter a valid due date');
    const school = await this.requireSchool(userId);
    const fee = this.feeRepository.create({
      ...createFeeDto,
      school,
      academicYear: createFeeDto.academicYear || due.getFullYear(),
      term: createFeeDto.term || termFromMonth(due.getMonth()),
    });
    await this.feeRepository.save(fee);
    return this.toFeeResponseDto(fee);
  }

  async getAllFees(userId: string, period: AcademicQuery = {}): Promise<FeeResponseDto[]> {
    const school = await this.schoolFor(userId);
    if (!school) return [];
    const fees = await this.feeRepository.find({ where: { school: { id: school.id } } });
    return fees.filter((fee) => inPeriod(fee, period)).map((fee) => this.toFeeResponseDto(fee));
  }

  async getFeeById(id: string, userId: string): Promise<FeeResponseDto> {
    const school = await this.requireSchool(userId);
    const fee = await this.feeRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!fee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }
    return this.toFeeResponseDto(fee);
  }

  async updateFee(id: string, updateFeeDto: UpdateFeeDto, userId: string): Promise<FeeResponseDto> {
    const school = await this.requireSchool(userId);
    const fee = await this.feeRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!fee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }

    if (updateFeeDto.amountPaid != null && Number(updateFeeDto.amountPaid) > Number(fee.amount)) {
      throw new BadRequestException('Amount paid cannot be greater than the fee');
    }
    Object.assign(fee, updateFeeDto);
    await this.feeRepository.save(fee);
    return this.toFeeResponseDto(fee);
  }

  async deleteFee(id: string, userId: string): Promise<{ message: string }> {
    const school = await this.requireSchool(userId);
    const fee = await this.feeRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!fee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }

    await this.feeRepository.remove(fee);
    return { message: 'Fee deleted successfully' };
  }

  async getFeeStats(userId: string, period: AcademicQuery = {}): Promise<{
    totalPaid: number;
    totalUnpaid: number;
    totalStudentsPaid: number;
    totalStudentsUnpaid: number;
  }> {
    const school = await this.schoolFor(userId);
    const fees = school
      ? (await this.feeRepository.find({ where: { school: { id: school.id } } })).filter((fee) => inPeriod(fee, period))
      : [];
    
    const paidFees = fees.filter(fee => fee.status === 'paid');
    const unpaidFees = fees.filter(fee => fee.status !== 'paid');
    
    const totalPaid = paidFees.reduce((sum, fee) => sum + Number(fee.amountPaid), 0);
    const totalUnpaid = unpaidFees.reduce((sum, fee) => sum + (Number(fee.amount) - Number(fee.amountPaid)), 0);
    
    return {
      totalPaid,
      totalUnpaid,
      totalStudentsPaid: paidFees.length,
      totalStudentsUnpaid: unpaidFees.length,
    };
  }

  // EXPENSE METHODS
  async createExpense(createExpenseDto: CreateExpenseDto, userId: string): Promise<ExpenseResponseDto> {
    const date = new Date(createExpenseDto.date);
    if (Number.isNaN(date.getTime())) throw new BadRequestException('Enter a valid expense date');
    const school = await this.requireSchool(userId);
    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      school,
      academicYear: createExpenseDto.academicYear || date.getFullYear(),
      term: createExpenseDto.term || termFromMonth(date.getMonth()),
    });
    await this.expenseRepository.save(expense);
    return this.toExpenseResponseDto(expense);
  }

  async getAllExpenses(userId: string, period: AcademicQuery = {}): Promise<ExpenseResponseDto[]> {
    const school = await this.schoolFor(userId);
    if (!school) return [];
    const expenses = await this.expenseRepository.find({ where: { school: { id: school.id } } });
    return expenses.filter((expense) => inPeriod(expense, period)).map((expense) => this.toExpenseResponseDto(expense));
  }

  async getExpenseById(id: string, userId: string): Promise<ExpenseResponseDto> {
    const school = await this.requireSchool(userId);
    const expense = await this.expenseRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return this.toExpenseResponseDto(expense);
  }

  async updateExpense(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
    userId: string,
  ): Promise<ExpenseResponseDto> {
    const school = await this.requireSchool(userId);
    const expense = await this.expenseRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    Object.assign(expense, updateExpenseDto);
    await this.expenseRepository.save(expense);
    return this.toExpenseResponseDto(expense);
  }

  async deleteExpense(id: string, userId: string): Promise<{ message: string }> {
    const school = await this.requireSchool(userId);
    const expense = await this.expenseRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    await this.expenseRepository.remove(expense);
    return { message: 'Expense deleted successfully' };
  }

  // PAYROLL METHODS
  async createPayroll(createPayrollDto: CreatePayrollDto, userId: string): Promise<PayrollResponseDto> {
    const month = new Date(createPayrollDto.payrollMonth);
    if (Number.isNaN(month.getTime())) throw new BadRequestException('Enter a valid payroll month');
    const allowances = Number(createPayrollDto.allowances || 0);
    const deductions = Number(createPayrollDto.deductions || 0);
    if (deductions > Number(createPayrollDto.baseSalary) + allowances) {
      throw new BadRequestException('Deductions cannot be greater than salary and allowances');
    }
    const school = await this.requireSchool(userId);
    const payroll = this.payrollRepository.create({
      ...createPayrollDto,
      school,
      academicYear: createPayrollDto.academicYear || month.getFullYear(),
      term: createPayrollDto.term || termFromMonth(month.getMonth()),
    });
    await this.payrollRepository.save(payroll);
    return this.toPayrollResponseDto(payroll);
  }

  async getAllPayrolls(userId: string, period: AcademicQuery = {}): Promise<PayrollResponseDto[]> {
    const school = await this.schoolFor(userId);
    if (!school) return [];
    const payrolls = await this.payrollRepository.find({ where: { school: { id: school.id } } });
    return payrolls.filter((payroll) => inPeriod(payroll, period)).map((payroll) => this.toPayrollResponseDto(payroll));
  }

  async getPayrollById(id: string, userId: string): Promise<PayrollResponseDto> {
    const school = await this.requireSchool(userId);
    const payroll = await this.payrollRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!payroll) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }
    return this.toPayrollResponseDto(payroll);
  }

  async updatePayroll(
    id: string,
    updatePayrollDto: UpdatePayrollDto,
    userId: string,
  ): Promise<PayrollResponseDto> {
    const school = await this.requireSchool(userId);
    const payroll = await this.payrollRepository.findOne({ where: { id, school: { id: school.id } } });
    if (!payroll) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }

    Object.assign(payroll, updatePayrollDto);
    await this.payrollRepository.save(payroll);
    return this.toPayrollResponseDto(payroll);
  }

  async deletePayroll(id: string, userId: string): Promise<{ message: string }> {
    const school = await this.requireSchool(userId);
    const payroll = await this.payrollRepository.findOne({ where: { id, school: { id: school.id } } });
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
      paymentMethod: fee.paymentMethod,
      academicYear: Number(fee.academicYear),
      term: fee.term,
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
      academicYear: Number(expense.academicYear),
      term: expense.term,
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
      paymentMethod: payroll.paymentMethod,
      academicYear: Number(payroll.academicYear),
      term: payroll.term,
      createdAt: payroll.createdAt,
    };
  }
}
