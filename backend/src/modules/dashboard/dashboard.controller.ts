import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { parsePeriod } from '../../common/academic';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async getUserSchoolId(userId: string): Promise<string | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['school']
    });
    return user?.school?.id || null;
  }

  @Get('stats')
  async getDashboardStats(
    @Req() req: { user: { userId: string; role: string } },
    @Query('year') year?: string,
    @Query('term') term?: string,
  ) {
    const schoolId = req.user.role === UserRole.ADMIN ? null : await this.getUserSchoolId(req.user.userId);
    return this.dashboardService.getDashboardStats(schoolId, parsePeriod(year, term));
  }

  @Get('financial-summary')
  async getFinancialSummary(
    @Req() req: { user: { userId: string; role: string } },
    @Query('year') year?: string,
    @Query('term') term?: string,
  ) {
    const schoolId = req.user.role === UserRole.ADMIN ? null : await this.getUserSchoolId(req.user.userId);
    return this.dashboardService.getFinancialSummary(schoolId, parsePeriod(year, term));
  }

  @Get('charts/income-expenses')
  async getIncomeExpensesData(
    @Req() req: { user: { userId: string; role: string } },
    @Query('year') year?: string,
    @Query('term') term?: string,
  ) {
    const schoolId = req.user.role === UserRole.ADMIN ? null : await this.getUserSchoolId(req.user.userId);
    return this.dashboardService.getIncomeExpensesData(schoolId, parsePeriod(year, term));
  }

  @Get('charts/payroll-trend')
  async getPayrollTrendData(
    @Req() req: { user: { userId: string; role: string } },
    @Query('year') year?: string,
    @Query('term') term?: string,
  ) {
    const schoolId = req.user.role === UserRole.ADMIN ? null : await this.getUserSchoolId(req.user.userId);
    return this.dashboardService.getPayrollTrendData(schoolId, parsePeriod(year, term));
  }
}