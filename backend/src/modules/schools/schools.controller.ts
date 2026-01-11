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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SchoolsService } from './schools.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateSchoolDto, UpdateSchoolDto, SchoolResponseDto } from '../../common/dto';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', {
    storage: diskStorage({
      destination: './uploads/logos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `logo-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  }))
  async create(
    @Body() createSchoolData: any,
    @UploadedFile() logoFile?: Express.Multer.File,
  ): Promise<SchoolResponseDto> {
    const createSchoolDto: CreateSchoolDto = {
      ...createSchoolData,
      logo: logoFile ? `/uploads/logos/${logoFile.filename}` : undefined,
    };
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

  @Get('debug/all')
  async getAllSchoolsDebug(): Promise<any[]> {
    return this.schoolsService.getAllSchoolsDebug();
  }

  @Get('code/:code')
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
