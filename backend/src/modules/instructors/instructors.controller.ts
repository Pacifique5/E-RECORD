import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto, InstructorResponseDto, UpdateInstructorDto } from '../../common/dto/instructor.dto';

@Controller('instructors')
@UseGuards(JwtAuthGuard)
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  create(
    @Body(ValidationPipe) dto: CreateInstructorDto,
    @Req() req: { user: { userId: string } },
  ): Promise<InstructorResponseDto> {
    return this.instructorsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: { user: { userId: string } }): Promise<InstructorResponseDto[]> {
    return this.instructorsService.findAll(req.user.userId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<InstructorResponseDto> {
    return this.instructorsService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateInstructorDto,
  ): Promise<InstructorResponseDto> {
    return this.instructorsService.update(id, dto);
  }
}
