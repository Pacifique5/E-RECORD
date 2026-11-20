import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { School } from '../../entities/school.entity';
import { Fee } from '../../entities/fee.entity';
import { Expense } from '../../entities/expense.entity';
import { Payroll } from '../../entities/payroll.entity';
import { AcademicQuery, inPeriod, SchoolTerm } from '../../common/academic';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
  ) {}

  async getDashboardStats(schoolId?: string | null, period: AcademicQuery = {}) {
    if (!schoolId) {
      // Admin view - all data
      const [totalUsers, totalSchools, fees, expenses, payrolls] = await Promise.all([
        this.userRepository.count(),
        this.schoolRepository.count(),
        this.feeRepository.find().then((rows) => rows.filter((row) => inPeriod(row, period))),
        this.expenseRepository.find().then((rows) => rows.filter((row) => inPeriod(row, period))),
        this.payrollRepository.find().then((rows) => rows.filter((row) => inPeriod(row, period))),
      ]);

      const totalFees = fees.reduce((sum, fee) => sum + Number(fee.amountPaid), 0);
      const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
      const totalPayrolls = payrolls.reduce((sum, payroll) => sum + Number(payroll.netSalary), 0);

      return {
        totalUsers,
        totalSchools,
        totalFees,
        totalExpenses,
        totalPayrolls,
        netIncome: totalFees - totalExpenses - totalPayrolls,
      };
    } else {
      // School-specific view - filtered data
      const [schoolUsers, fees, expenses, payrolls] = await Promise.all([
        this.userRepository.count({ where: { school: { id: schoolId } } }),
        this.feeRepository.find({ where: { school: { id: schoolId } } }).then((rows) => rows.filter((row) => inPeriod(row, period))),
        this.expenseRepository.find({ where: { school: { id: schoolId } } }).then((rows) => rows.filter((row) => inPeriod(row, period))),
        this.payrollRepository.find({ where: { school: { id: schoolId } } }).then((rows) => rows.filter((row) => inPeriod(row, period))),
      ]);

      const totalFees = fees.reduce((sum, fee) => sum + Number(fee.amountPaid), 0);
      const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
      const totalPayrolls = payrolls.reduce((sum, payroll) => sum + Number(payroll.netSalary), 0);

      return {
        totalUsers: schoolUsers,
        totalSchools: 1, // Current school only
        totalFees,
        totalExpenses,
        totalPayrolls,
        netIncome: totalFees - totalExpenses - totalPayrolls,
      };
    }
  }

  async getFinancialSummary(schoolId?: string | null, period: AcademicQuery = {}) {
    const whereClause = schoolId ? { school: { id: schoolId } } : {};
    
    const [fees, expenses, payrolls] = await Promise.all([
      this.feeRepository.find({ where: whereClause }).then((rows) => rows.filter((row) => inPeriod(row, period))),
      this.expenseRepository.find({ where: whereClause }).then((rows) => rows.filter((row) => inPeriod(row, period))),
      this.payrollRepository.find({ where: whereClause }).then((rows) => rows.filter((row) => inPeriod(row, period))),
    ]);

    const paidFees = fees.filter(fee => fee.status === 'paid');
    const unpaidFees = fees.filter(fee => fee.status !== 'paid');

    const totalIncome = paidFees.reduce((sum, fee) => sum + Number(fee.amountPaid), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const totalPayroll = payrolls.reduce((sum, payroll) => sum + Number(payroll.netSalary), 0);

    return {
      totalIncome,
      totalExpenses,
      totalPayroll,
      netProfit: totalIncome - totalExpenses - totalPayroll,
      paidFeesCount: paidFees.length,
      unpaidFeesCount: unpaidFees.length,
    };
  }

  async getIncomeExpensesData(schoolId?: string | null, period: AcademicQuery = {}) {
    const whereClause = schoolId ? { school: { id: schoolId } } : {};
    
    const [fees, expenses] = await Promise.all([
      this.feeRepository.find({ where: whereClause }).then((rows) => rows.filter((row) => inPeriod(row, period))),
      this.expenseRepository.find({ where: whereClause }).then((rows) => rows.filter((row) => inPeriod(row, period))),
    ]);

    const monthlyData: Array<{ month: string; income: number; expenses: number }> = [];
    
    for (const date of this.monthsFor(period)) {
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const monthlyIncome = fees
        .filter(fee => {
          const feeDate = new Date(fee.paidDate || fee.createdAt);
          return feeDate.getMonth() === date.getMonth() && 
                 feeDate.getFullYear() === date.getFullYear() &&
                 fee.status === 'paid';
        })
        .reduce((sum, fee) => sum + Number(fee.amountPaid), 0);

      const monthlyExpenses = expenses
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() === date.getMonth() && 
                 expenseDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, expense) => sum + Number(expense.amount), 0);

      monthlyData.push({
        month: monthName,
        income: monthlyIncome,
        expenses: monthlyExpenses,
      });
    }

    return monthlyData;
  }

  async getPayrollTrendData(schoolId?: string | null, period: AcademicQuery = {}) {
    const whereClause = schoolId ? { school: { id: schoolId } } : {};
    const payrolls = (await this.payrollRepository.find({ where: whereClause })).filter((row) => inPeriod(row, period));

    const monthlyData: Array<{ month: string; amount: number }> = [];
    
    for (const date of this.monthsFor(period)) {
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const monthlyPayroll = payrolls
        .filter(payroll => {
          const payrollDate = new Date(payroll.payrollMonth);
          return payrollDate.getMonth() === date.getMonth() && 
                 payrollDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, payroll) => sum + Number(payroll.netSalary), 0);

      monthlyData.push({
        month: monthName,
        amount: monthlyPayroll,
      });
    }

    return monthlyData;
  }

  private monthsFor(period: AcademicQuery) {
    const year = period.year || new Date().getFullYear();
    const byTerm: Record<SchoolTerm, number[]> = {
      [SchoolTerm.FIRST]: [0, 1, 2, 3],
      [SchoolTerm.SECOND]: [4, 5, 6, 7],
      [SchoolTerm.THIRD]: [8, 9, 10, 11],
    };
    const months = period.term ? byTerm[period.term] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return months.map((month) => new Date(year, month, 1));
  }
}