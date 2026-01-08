import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../common/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, password, firstName, lastName, phoneNumber, role } =
      createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role,
    });

    await this.userRepository.save(user);
    return this.toResponseDto(user);
  }

  async findAll(
    role?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    users: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.school', 'school');

    if (role) {
      queryBuilder.where('user.role = :role', { role });
    }

    const total = await queryBuilder.getCount();
    const users = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      users: users.map((user) => this.toResponseDto(user)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['school'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.toResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['school'],
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return this.toResponseDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return this.toResponseDto(user);
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.isActive = false;
    await this.userRepository.save(user);
    return { message: 'User deactivated successfully' };
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive,
      createdAt: user.createdAt,
      school: user.school ? {
        id: user.school.id,
        name: user.school.name,
        code: user.school.code,
        status: user.school.status,
      } : null,
    };
  }
}
