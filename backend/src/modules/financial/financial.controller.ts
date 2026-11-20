import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { parsePeriod } from '../../common/academic';
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

type AuthRequest = { user: { userId: string } };

@Controller('financial')
@UseGuards(JwtAuthGuard)
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  // FEE ENDPOINTS
  @Post('fees')
  async createFee(
    @Body(ValidationPipe) createFeeDto: CreateFeeDto,
    @Req() req: AuthRequest,
  ): Promise<FeeResponseDto> {
    return this.financialService.createFee(createFeeDto, req.user.userId);
  }

  @Get('fees')
  async getAllFees(
    @Req() req: AuthRequest,
    @Query('year') year?: string,
    @Query('term') term?: string,
  ): Promise<FeeResponseDto[]> {
    return this.financialService.getAllFees(req.user.userId, parsePeriod(year, term));
  }

  @Get('fees/:id')
  async getFeeById(@Param('id') id: string, @Req() req: AuthRequest): Promise<FeeResponseDto> {
    return this.financialService.getFeeById(id, req.user.userId);
  }

  @Put('fees/:id')
  async updateFee(
    @Param('id') id: string,
    @Body(ValidationPipe) updateFeeDto: UpdateFeeDto,
    @Req() req: AuthRequest,
  ): Promise<FeeResponseDto> {
    return this.financialService.updateFee(id, updateFeeDto, req.user.userId);
  }

  @Delete('fees/:id')
  async deleteFee(@Param('id') id: string, @Req() req: AuthRequest): Promise<{ message: string }> {
    return this.financialService.deleteFee(id, req.user.userId);
  }

  @Get('fees/stats')
  async getFeeStats(
    @Req() req: AuthRequest,
    @Query('year') year?: string,
    @Query('term') term?: string,
  ): Promise<{
    totalPaid: number;
    totalUnpaid: number;
    totalStudentsPaid: number;
    totalStudentsUnpaid: number;
  }> {
    return this.financialService.getFeeStats(req.user.userId, parsePeriod(year, term));
  }

  // EXPENSE ENDPOINTS
  @Post('expenses')
  async createExpense(
    @Body(ValidationPipe) createExpenseDto: CreateExpenseDto,
    @Req() req: AuthRequest,
  ): Promise<ExpenseResponseDto> {
    return this.financialService.createExpense(createExpenseDto, req.user.userId);
  }

  @Get('expenses')
  async getAllExpenses(
    @Req() req: AuthRequest,
    @Query('year') year?: string,
    @Query('term') term?: string,
  ): Promise<ExpenseResponseDto[]> {
    return this.financialService.getAllExpenses(req.user.userId, parsePeriod(year, term));
  }

  @Get('expenses/:id')
  async getExpenseById(@Param('id') id: string, @Req() req: AuthRequest): Promise<ExpenseResponseDto> {
    return this.financialService.getExpenseById(id, req.user.userId);
  }

  @Put('expenses/:id')
  async updateExpense(
    @Param('id') id: string,
    @Body(ValidationPipe) updateExpenseDto: UpdateExpenseDto,
    @Req() req: AuthRequest,
  ): Promise<ExpenseResponseDto> {
    return this.financialService.updateExpense(id, updateExpenseDto, req.user.userId);
  }

  @Delete('expenses/:id')
  async deleteExpense(@Param('id') id: string, @Req() req: AuthRequest): Promise<{ message: string }> {
    return this.financialService.deleteExpense(id, req.user.userId);
  }

  // PAYROLL ENDPOINTS
  @Post('payrolls')
  async createPayroll(
    @Body(ValidationPipe) createPayrollDto: CreatePayrollDto,
    @Req() req: AuthRequest,
  ): Promise<PayrollResponseDto> {
    return this.financialService.createPayroll(createPayrollDto, req.user.userId);
  }

  @Get('payrolls')
  async getAllPayrolls(
    @Req() req: AuthRequest,
    @Query('year') year?: string,
    @Query('term') term?: string,
  ): Promise<PayrollResponseDto[]> {
    return this.financialService.getAllPayrolls(req.user.userId, parsePeriod(year, term));
  }

  @Get('payrolls/:id')
  async getPayrollById(@Param('id') id: string, @Req() req: AuthRequest): Promise<PayrollResponseDto> {
    return this.financialService.getPayrollById(id, req.user.userId);
  }

  @Put('payrolls/:id')
  async updatePayroll(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePayrollDto: UpdatePayrollDto,
    @Req() req: AuthRequest,
  ): Promise<PayrollResponseDto> {
    return this.financialService.updatePayroll(id, updatePayrollDto, req.user.userId);
  }

  @Delete('payrolls/:id')
  async deletePayroll(@Param('id') id: string, @Req() req: AuthRequest): Promise<{ message: string }> {
    return this.financialService.deletePayroll(id, req.user.userId);
  }
}