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

  @Post('verify-school-code')
  @UseGuards(JwtAuthGuard)
  async verifySchoolCode(
    @Request() req,
    @Body() body: { code: string },
  ): Promise<{ valid: boolean; message?: string }> {
    return this.authService.verifySchoolCode(req.user.sub, body.code);
  }
}
