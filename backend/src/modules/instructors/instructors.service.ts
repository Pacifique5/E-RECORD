import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from '../../entities/instructor.entity';
import { User } from '../../entities/user.entity';
import { CreateInstructorDto, InstructorResponseDto, UpdateInstructorDto } from '../../common/dto/instructor.dto';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateInstructorDto, userId: string): Promise<InstructorResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['school'],
    });
    if (!user?.school) throw new BadRequestException('This account is not linked to a school');
    const instructor = this.instructorRepository.create({
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      gender: dto.gender,
      phone: dto.phone.trim(),
      alternatePhone: dto.alternatePhone?.trim() || null,
      subject: dto.subject,
      instructorCode: await this.nextCode(),
      school: user.school,
    });
    await this.instructorRepository.save(instructor);
    return this.toResponse(instructor);
  }

  async findAll(userId: string): Promise<InstructorResponseDto[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['school'],
    });
    if (!user?.school) return [];
    const instructors = await this.instructorRepository.find({
      where: { school: { id: user.school.id } },
      order: { instructorCode: 'ASC' },
    });
    return instructors.map((instructor) => this.toResponse(instructor));
  }

  async findById(id: string, userId: string): Promise<InstructorResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['school'] });
    const instructor = await this.instructorRepository.findOne({
      where: user?.school ? { id, school: { id: user.school.id } } : { id: '00000000-0000-0000-0000-000000000000' },
    });
    if (!instructor) throw new NotFoundException('Instructor not found');
    return this.toResponse(instructor);
  }

  async update(id: string, dto: UpdateInstructorDto, userId: string): Promise<InstructorResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['school'] });
    const instructor = await this.instructorRepository.findOne({
      where: user?.school ? { id, school: { id: user.school.id } } : { id: '00000000-0000-0000-0000-000000000000' },
    });
    if (!instructor) throw new NotFoundException('Instructor not found');

    if (dto.firstName !== undefined) instructor.firstName = dto.firstName.trim();
    if (dto.lastName !== undefined) instructor.lastName = dto.lastName.trim();
    if (dto.gender !== undefined) instructor.gender = dto.gender;
    if (dto.phone !== undefined) instructor.phone = dto.phone.trim();
    if (dto.alternatePhone !== undefined) instructor.alternatePhone = dto.alternatePhone?.trim() || null;
    if (dto.subject !== undefined) instructor.subject = dto.subject;

    await this.instructorRepository.save(instructor);
    return this.toResponse(instructor);
  }

  private async nextCode() {
    const count = await this.instructorRepository.count();
    let number = count + 1;
    let code = `INS${String(number).padStart(3, '0')}`;
    while (await this.instructorRepository.findOne({ where: { instructorCode: code } })) {
      number += 1;
      code = `INS${String(number).padStart(3, '0')}`;
    }
    return code;
  }

  private toResponse(instructor: Instructor): InstructorResponseDto {
    return {
      id: instructor.id,
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      instructorCode: instructor.instructorCode,
      gender: instructor.gender,
      phone: instructor.phone,
      alternatePhone: instructor.alternatePhone,
      subject: instructor.subject,
      createdAt: instructor.createdAt,
    };
  }
}
