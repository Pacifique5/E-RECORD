import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { School } from '../../entities/school.entity';
import { Fee } from '../../entities/fee.entity';
import { Expense } from '../../entities/expense.entity';
import { Payroll } from '../../entities/payroll.entity';

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

  async getDashboardStats(schoolId?: string | null) {
    if (!schoolId) {
      // Admin view - all data
      const [totalUsers, totalSchools, fees, expenses, payrolls] = await Promise.all([
        this.userRepository.count(),
        this.schoolRepository.count(),
        this.feeRepository.find(),
        this.expenseRepository.find(),
        this.payrollRepository.find(),
      ]);

      const totalFees = fees.reduce((sum, fee) => sum + fee.amountPaid, 0);
      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const totalPayrolls = payrolls.reduce((sum, payroll) => sum + payroll.netSalary, 0);

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
        this.feeRepository.find({ where: { school: { id: schoolId } } }),
        this.expenseRepository.find({ where: { school: { id: schoolId } } }),
        this.payrollRepository.find({ where: { school: { id: schoolId } } }),
      ]);

      const totalFees = fees.reduce((sum, fee) => sum + fee.amountPaid, 0);
      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const totalPayrolls = payrolls.reduce((sum, payroll) => sum + payroll.netSalary, 0);

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

  async getFinancialSummary(schoolId?: string | null) {
    const whereClause = schoolId ? { school: { id: schoolId } } : {};
    
    const [fees, expenses, payrolls] = await Promise.all([
      this.feeRepository.find({ where: whereClause }),
      this.expenseRepository.find({ where: whereClause }),
      this.payrollRepository.find({ where: whereClause }),
    ]);

    const paidFees = fees.filter(fee => fee.status === 'paid');
    const unpaidFees = fees.filter(fee => fee.status !== 'paid');

    const totalIncome = paidFees.reduce((sum, fee) => sum + fee.amountPaid, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalPayroll = payrolls.reduce((sum, payroll) => sum + payroll.netSalary, 0);

    return {
      totalIncome,
      totalExpenses,
      totalPayroll,
      netProfit: totalIncome - totalExpenses - totalPayroll,
      paidFeesCount: paidFees.length,
      unpaidFeesCount: unpaidFees.length,
    };
  }

  async getIncomeExpensesData(schoolId?: string | null) {
    const whereClause = schoolId ? { school: { id: schoolId } } : {};
    
    const [fees, expenses] = await Promise.all([
      this.feeRepository.find({ where: whereClause }),
      this.expenseRepository.find({ where: whereClause }),
    ]);

    // Group by month for the last 6 months
    const monthlyData: Array<{ month: string; income: number; expenses: number }> = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const monthlyIncome = fees
        .filter(fee => {
          const feeDate = new Date(fee.paidDate || fee.createdAt);
          return feeDate.getMonth() === date.getMonth() && 
                 feeDate.getFullYear() === date.getFullYear() &&
                 fee.status === 'paid';
        })
        .reduce((sum, fee) => sum + fee.amountPaid, 0);

      const monthlyExpenses = expenses
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() === date.getMonth() && 
                 expenseDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, expense) => sum + expense.amount, 0);

      monthlyData.push({
        month: monthName,
        income: monthlyIncome,
        expenses: monthlyExpenses,
      });
    }

    return monthlyData;
  }

  async getPayrollTrendData(schoolId?: string | null) {
    const whereClause = schoolId ? { school: { id: schoolId } } : {};
    const payrolls = await this.payrollRepository.find({ where: whereClause });

    // Group by month for the last 6 months
    const monthlyData: Array<{ month: string; amount: number }> = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const monthlyPayroll = payrolls
        .filter(payroll => {
          const payrollDate = new Date(payroll.payrollMonth);
          return payrollDate.getMonth() === date.getMonth() && 
                 payrollDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, payroll) => sum + payroll.netSalary, 0);

      monthlyData.push({
        month: monthName,
        amount: monthlyPayroll,
      });
    }

    return monthlyData;
  }
}