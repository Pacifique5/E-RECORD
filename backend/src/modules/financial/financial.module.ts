import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee, Expense, Payroll } from '../../entities';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Expense, Payroll])],
  providers: [FinancialService],
  controllers: [FinancialController],
  exports: [FinancialService],
})
export class FinancialModule {}
