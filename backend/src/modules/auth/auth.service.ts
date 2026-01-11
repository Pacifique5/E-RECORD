import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../../entities/user.entity';
import { LoginDto, RegisterDto, AuthResponseDto } from '../../common/dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, firstName, lastName, phoneNumber, role } = registerDto;

    // Only allow headmaster registration
    if (role && role !== 'headmaster') {
      throw new UnauthorizedException('Only headmasters can register new accounts');
    }

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role: UserRole.HEADMASTER, // Force headmaster role for registration
    });

    await this.userRepository.save(user);

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: ['school']
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      accessToken,
      school: user.school ? {
        id: user.school.id,
        name: user.school.name,
        code: user.school.code,
        status: user.school.status,
        logo: user.school.logo,
      } : null,
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async verifySchoolCode(userId: string, enteredCode: string): Promise<{ valid: boolean; message?: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['school'],
    });

    if (!user) {
      return { valid: false, message: 'User not found' };
    }

    if (!user.school) {
      return { valid: false, message: 'No school associated with your account' };
    }

    if (user.school.status !== 'approved') {
      return { valid: false, message: 'Your school is not approved yet' };
    }

    if (user.school.code !== enteredCode) {
      return { 
        valid: false, 
        message: `Access denied! You entered "${enteredCode}" but you are associated with ${user.school.name} (code: ${user.school.code}). Please use your own school's code.`
      };
    }

    return { valid: true };
  }
}
