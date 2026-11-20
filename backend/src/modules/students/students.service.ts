import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student, UPPER_CLASSES } from '../../entities/student.entity';
import { classInYear } from '../../common/academic';
import { User, UserRole } from '../../entities/user.entity';
import { CreateStudentDto, StudentResponseDto, UpdateStudentDto } from '../../common/dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateStudentDto, userId: string): Promise<StudentResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['school'],
    });
    this.assertDob(dto.dateOfBirth);
    const classLevel = dto.classLevel;
    const combination = this.resolveCombination(classLevel, dto.combination);
    const student = this.studentRepository.create({
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      entryYear: dto.entryYear,
      fatherName: dto.fatherName.trim(),
      fatherPhone: dto.fatherPhone.trim(),
      motherName: dto.motherName.trim(),
      motherPhone: dto.motherPhone.trim(),
      classLevel,
      combination,
      studentCode: await this.nextCode(),
      ...(user?.school ? { school: user.school } : {}),
    });
    await this.studentRepository.save(student);
    return this.toResponse(student);
  }

  async findAll(userId: string, year?: number): Promise<StudentResponseDto[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['school'],
    });
    const where =
      user && user.role !== UserRole.ADMIN && user.school
        ? { school: { id: user.school.id } }
        : {};
    const students = await this.studentRepository.find({
      where,
      order: { studentCode: 'ASC' },
    });
    return students
      .map((student) => this.toResponse(student, year))
      .filter((student) => (year ? student.enrolled : true));
  }

  async findById(id: string): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return this.toResponse(student);
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    if (dto.dateOfBirth) this.assertDob(dto.dateOfBirth);
    const classLevel = dto.classLevel || student.classLevel;
    const combination = this.resolveCombination(
      classLevel,
      dto.combination === undefined ? student.combination : dto.combination,
    );

    Object.assign(student, {
      ...dto,
      classLevel,
      entryYear: dto.entryYear || student.entryYear,
      combination,
      dateOfBirth: dto.dateOfBirth || student.dateOfBirth,
    });
    await this.studentRepository.save(student);
    return this.toResponse(student);
  }

  private resolveCombination(classLevel: Student['classLevel'], combination?: Student['combination']) {
    if (UPPER_CLASSES.includes(classLevel) && !combination) {
      throw new BadRequestException('Select the combination for S4, S5, and S6');
    }
    return combination || null;
  }

  private assertDob(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime()) || date > new Date()) {
      throw new BadRequestException('Enter a date of birth that is not in the future');
    }
    const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    if (age < 4 || age > 30) {
      throw new BadRequestException('Student age must be between 4 and 30');
    }
  }

  private async nextCode() {
    const count = await this.studentRepository.count();
    let number = count + 1;
    let code = `STU${String(number).padStart(3, '0')}`;
    while (await this.studentRepository.findOne({ where: { studentCode: code } })) {
      number += 1;
      code = `STU${String(number).padStart(3, '0')}`;
    }
    return code;
  }

  private toResponse(student: Student, year?: number): StudentResponseDto {
    const entryYear = Number(student.entryYear) || new Date().getFullYear();
    const viewedYear = year || entryYear;
    const currentClass = classInYear(student.classLevel, entryYear, viewedYear);
    const showing = (currentClass || student.classLevel) as Student['classLevel'];
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      studentCode: student.studentCode,
      gender: student.gender,
      dateOfBirth: String(student.dateOfBirth).slice(0, 10),
      fatherName: student.fatherName,
      fatherPhone: student.fatherPhone,
      motherName: student.motherName,
      motherPhone: student.motherPhone,
      classLevel: showing,
      entryClass: student.classLevel,
      entryYear,
      enrolled: currentClass !== null,
      combination: currentClass && UPPER_CLASSES.includes(currentClass as Student['classLevel']) ? student.combination : null,
      createdAt: student.createdAt,
    };
  }
}
