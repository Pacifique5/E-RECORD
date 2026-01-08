import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User } from '../../entities/user.entity';
import { School } from '../../entities/school.entity';
import { Fee } from '../../entities/fee.entity';
import { Expense } from '../../entities/expense.entity';
import { Payroll } from '../../entities/payroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, School, Fee, Expense, Payroll])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}