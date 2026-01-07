import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FinancialService } from './financial.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
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

@Controller('financial')
@UseGuards(JwtAuthGuard)
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  // FEE ENDPOINTS
  @Post('fees')
  async createFee(
    @Body(ValidationPipe) createFeeDto: CreateFeeDto,
  ): Promise<FeeResponseDto> {
    return this.financialService.createFee(createFeeDto);
  }

  @Get('fees')
  async getAllFees(): Promise<FeeResponseDto[]> {
    return this.financialService.getAllFees();
  }

  @Get('fees/:id')
  async getFeeById(@Param('id') id: string): Promise<FeeResponseDto> {
    return this.financialService.getFeeById(id);
  }

  @Put('fees/:id')
  async updateFee(
    @Param('id') id: string,
    @Body(ValidationPipe) updateFeeDto: UpdateFeeDto,
  ): Promise<FeeResponseDto> {
    return this.financialService.updateFee(id, updateFeeDto);
  }

  @Delete('fees/:id')
  async deleteFee(@Param('id') id: string): Promise<{ message: string }> {
    return this.financialService.deleteFee(id);
  }

  // EXPENSE ENDPOINTS
  @Post('expenses')
  async createExpense(
    @Body(ValidationPipe) createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    return this.financialService.createExpense(createExpenseDto);
  }

  @Get('expenses')
  async getAllExpenses(): Promise<ExpenseResponseDto[]> {
    return this.financialService.getAllExpenses();
  }

  @Get('expenses/:id')
  async getExpenseById(@Param('id') id: string): Promise<ExpenseResponseDto> {
    return this.financialService.getExpenseById(id);
  }

  @Put('expenses/:id')
  async updateExpense(
    @Param('id') id: string,
    @Body(ValidationPipe) updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    return this.financialService.updateExpense(id, updateExpenseDto);
  }

  @Delete('expenses/:id')
  async deleteExpense(@Param('id') id: string): Promise<{ message: string }> {
    return this.financialService.deleteExpense(id);
  }

  // PAYROLL ENDPOINTS
  @Post('payrolls')
  async createPayroll(
    @Body(ValidationPipe) createPayrollDto: CreatePayrollDto,
  ): Promise<PayrollResponseDto> {
    return this.financialService.createPayroll(createPayrollDto);
  }

  @Get('payrolls')
  async getAllPayrolls(): Promise<PayrollResponseDto[]> {
    return this.financialService.getAllPayrolls();
  }

  @Get('payrolls/:id')
  async getPayrollById(@Param('id') id: string): Promise<PayrollResponseDto> {
    return this.financialService.getPayrollById(id);
  }

  @Put('payrolls/:id')
  async updatePayroll(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePayrollDto: UpdatePayrollDto,
  ): Promise<PayrollResponseDto> {
    return this.financialService.updatePayroll(id, updatePayrollDto);
  }

  @Delete('payrolls/:id')
  async deletePayroll(@Param('id') id: string): Promise<{ message: string }> {
    return this.financialService.deletePayroll(id);
  }
}
