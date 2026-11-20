import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee, Expense, Payroll, User } from '../../entities';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Expense, Payroll, User])],
  providers: [FinancialService],
  controllers: [FinancialController],
  exports: [FinancialService],
})
export class FinancialModule {}
