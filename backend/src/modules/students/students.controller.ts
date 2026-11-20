import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { parsePeriod } from '../../common/academic';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StudentsService } from './students.service';
import { CreateStudentDto, StudentResponseDto, UpdateStudentDto } from '../../common/dto/student.dto';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(
    @Body(ValidationPipe) dto: CreateStudentDto,
    @Req() req: { user: { userId: string } },
  ): Promise<StudentResponseDto> {
    return this.studentsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(
    @Req() req: { user: { userId: string } },
    @Query('year') year?: string,
  ): Promise<StudentResponseDto[]> {
    return this.studentsService.findAll(req.user.userId, parsePeriod(year).year);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<StudentResponseDto> {
    return this.studentsService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    return this.studentsService.update(id, dto);
  }
}
