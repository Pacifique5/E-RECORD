import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { School } from '../../entities/school.entity';
import { User, UserRole } from '../../entities/user.entity';
import { CreateSchoolDto, UpdateSchoolDto, SchoolResponseDto } from '../../common/dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<SchoolResponseDto> {
    const { headmasterId, ...schoolData } = createSchoolDto;
    
    // Generate a temporary code for the request
    const tempCode = `REQ${Date.now()}`;
    
    const school = this.schoolRepository.create({
      ...schoolData,
      code: tempCode,
      status: 'pending', // Set as pending for admin approval
    });
    
    const savedSchool = await this.schoolRepository.save(school);
    
    // If headmasterId is provided, link the school to the headmaster
    if (headmasterId) {
      const headmaster = await this.userRepository.findOne({ 
        where: { id: headmasterId } 
      });
      
      if (headmaster) {
        headmaster.school = savedSchool;
        await this.userRepository.save(headmaster);
      }
    }
    
    return this.toResponseDto(savedSchool);
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
    const school = await this.schoolRepository.findOne({ 
      where: { id },
      relations: ['users']
    });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    // Generate a proper school code when accepting
    const schoolCode = await this.generateSchoolCode();
    
    school.status = 'approved';
    school.code = schoolCode;
    await this.schoolRepository.save(school);

    return { 
      message: `School request accepted successfully. School code: ${schoolCode}. The headmaster can now login with their personal email and password.` 
    };
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
    console.log('Looking for school with code:', code); // Debug log
    const school = await this.schoolRepository.findOne({
      where: { code },
    });
    console.log('Found school:', school ? school.name : 'Not found'); // Debug log
    if (!school) {
      throw new NotFoundException(`School with code ${code} not found`);
    }
    return this.toResponseDto(school);
  }

  async getAllSchoolsDebug(): Promise<any[]> {
    const schools = await this.schoolRepository.find();
    return schools.map(school => ({
      id: school.id,
      name: school.name,
      code: school.code,
      status: school.status,
      isActive: school.isActive,
    }));
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
