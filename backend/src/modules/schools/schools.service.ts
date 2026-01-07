import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../../entities/school.entity';
import { CreateSchoolDto, UpdateSchoolDto, SchoolResponseDto } from '../../common/dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<SchoolResponseDto> {
    const school = this.schoolRepository.create(createSchoolDto);
    await this.schoolRepository.save(school);
    return this.toResponseDto(school);
  }

  async findAll(): Promise<SchoolResponseDto[]> {
    const schools = await this.schoolRepository.find();
    return schools.map((school) => this.toResponseDto(school));
  }

  async findById(id: string): Promise<SchoolResponseDto> {
    const school = await this.schoolRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    return this.toResponseDto(school);
  }

  async findByCode(code: string): Promise<SchoolResponseDto> {
    const school = await this.schoolRepository.findOne({
      where: { code },
    });
    if (!school) {
      throw new NotFoundException(`School with code ${code} not found`);
    }
    return this.toResponseDto(school);
  }

  async update(
    id: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<SchoolResponseDto> {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    Object.assign(school, updateSchoolDto);
    await this.schoolRepository.save(school);
    return this.toResponseDto(school);
  }

  async delete(id: string): Promise<{ message: string }> {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    school.isActive = false;
    await this.schoolRepository.save(school);
    return { message: 'School deactivated successfully' };
  }

  private toResponseDto(school: School): SchoolResponseDto {
    return {
      id: school.id,
      code: school.code,
      name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      country: school.country,
      phoneNumber: school.phoneNumber,
      email: school.email,
      isActive: school.isActive,
      createdAt: school.createdAt,
    };
  }
}
