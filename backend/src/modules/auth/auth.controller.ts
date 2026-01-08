import { Controller, Post, Body, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, AuthResponseDto, AddAccountantDto } from '../../common/dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('add-accountant')
  @UseGuards(JwtAuthGuard)
  async addAccountant(
    @Request() req,
    @Body(ValidationPipe) addAccountantDto: AddAccountantDto,
  ): Promise<AuthResponseDto> {
    return this.authService.addAccountant(req.user.sub, addAccountantDto);
  }
}
