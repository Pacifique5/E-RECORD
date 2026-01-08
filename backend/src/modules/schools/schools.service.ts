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
    // Generate a temporary code for the request
    const tempCode = `REQ${Date.now()}`;
    
    const school = this.schoolRepository.create({
      ...createSchoolDto,
      code: tempCode,
      status: 'pending', // Set as pending for admin approval
    });
    await this.schoolRepository.save(school);
    return this.toResponseDto(school);
  }

  async findAll(): Promise<SchoolResponseDto[]> {
    const schools = await this.schoolRepository.find({
      where: { status: 'approved' },
    });
    return schools.map((school) => this.toResponseDto(school));
  }

  async getSchoolRequests(): Promise<SchoolResponseDto[]> {
    const schools = await this.schoolRepository.find({
      where: { status: 'pending' },
    });
    return schools.map((school) => this.toResponseDto(school));
  }

  async acceptSchoolRequest(id: string): Promise<{ message: string }> {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    // Generate a proper school code when accepting
    const schoolCode = await this.generateSchoolCode();
    
    school.status = 'approved';
    school.code = schoolCode;
    await this.schoolRepository.save(school);
    return { message: `School request accepted successfully. School code: ${schoolCode}` };
  }

  async rejectSchoolRequest(id: string): Promise<{ message: string }> {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    school.status = 'rejected';
    await this.schoolRepository.save(school);
    return { message: 'School request rejected successfully' };
  }

  private async generateSchoolCode(): Promise<string> {
    // Find the highest existing school code number
    const schools = await this.schoolRepository.find({
      where: { status: 'approved' },
      order: { code: 'DESC' }
    });
    
    let nextNumber = 1;
    for (const school of schools) {
      if (school.code.startsWith('SCH')) {
        const codeNumber = parseInt(school.code.substring(3));
        if (!isNaN(codeNumber) && codeNumber >= nextNumber) {
          nextNumber = codeNumber + 1;
        }
      }
    }
    
    return `SCH${nextNumber.toString().padStart(4, '0')}`;
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
      status: school.status,
      createdAt: school.createdAt,
    };
  }
}
