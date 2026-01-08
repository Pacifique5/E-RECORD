import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getDashboardStats() {
    return this.dashboardService.getDashboardStats();
  }

  @Get('financial-summary')
  async getFinancialSummary() {
    return this.dashboardService.getFinancialSummary();
  }

  @Get('charts/income-expenses')
  async getIncomeExpensesData() {
    return this.dashboardService.getIncomeExpensesData();
  }

  @Get('charts/payroll-trend')
  async getPayrollTrendData() {
    return this.dashboardService.getPayrollTrendData();
  }
}