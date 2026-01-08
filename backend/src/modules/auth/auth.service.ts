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
      } : null,
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async addAccountant(
    headmasterId: string,
    accountantData: { email: string; firstName: string; lastName: string; phoneNumber?: string; password: string }
  ): Promise<AuthResponseDto> {
    // Verify the requester is a headmaster
    const headmaster = await this.userRepository.findOne({ 
      where: { id: headmasterId },
      relations: ['school']
    });
    
    if (!headmaster || headmaster.role !== UserRole.HEADMASTER) {
      throw new UnauthorizedException('Only headmasters can add accountants');
    }

    // Verify the headmaster's school is approved
    if (!headmaster.school || headmaster.school.status !== 'approved') {
      throw new UnauthorizedException('School must be approved before adding accountants');
    }

    const existingUser = await this.userRepository.findOne({ where: { email: accountantData.email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(accountantData.password, 10);

    const accountant = this.userRepository.create({
      email: accountantData.email,
      password: hashedPassword,
      firstName: accountantData.firstName,
      lastName: accountantData.lastName,
      phoneNumber: accountantData.phoneNumber,
      role: UserRole.ACCOUNTANT,
      school: headmaster.school,
    });

    await this.userRepository.save(accountant);

    const accessToken = this.jwtService.sign({
      sub: accountant.id,
      email: accountant.email,
      role: accountant.role,
    });

    return {
      id: accountant.id,
      email: accountant.email,
      firstName: accountant.firstName,
      lastName: accountant.lastName,
      role: accountant.role,
      accessToken,
    };
  }
}
