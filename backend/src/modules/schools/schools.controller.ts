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
import { SchoolsService } from './schools.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateSchoolDto, UpdateSchoolDto, SchoolResponseDto } from '../../common/dto';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body(ValidationPipe) createSchoolDto: CreateSchoolDto,
  ): Promise<SchoolResponseDto> {
    return this.schoolsService.create(createSchoolDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<SchoolResponseDto[]> {
    return this.schoolsService.findAll();
  }

  @Get('requests')
  @UseGuards(JwtAuthGuard)
  async getSchoolRequests(): Promise<SchoolResponseDto[]> {
    return this.schoolsService.getSchoolRequests();
  }

  @Post(':id/accept')
  @UseGuards(JwtAuthGuard)
  async acceptSchoolRequest(@Param('id') id: string): Promise<{ message: string }> {
    return this.schoolsService.acceptSchoolRequest(id);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard)
  async rejectSchoolRequest(@Param('id') id: string): Promise<{ message: string }> {
    return this.schoolsService.rejectSchoolRequest(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<SchoolResponseDto> {
    return this.schoolsService.findById(id);
  }

  @Get('code/:code')
  @UseGuards(JwtAuthGuard)
  async findByCode(@Param('code') code: string): Promise<SchoolResponseDto> {
    return this.schoolsService.findByCode(code);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSchoolDto: UpdateSchoolDto,
  ): Promise<SchoolResponseDto> {
    return this.schoolsService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.schoolsService.delete(id);
  }
}
