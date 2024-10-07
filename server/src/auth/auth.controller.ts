import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { SuccessResponseWith } from 'src/consts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<SuccessResponseWith<{ token: string }>> {
    return await this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<SuccessResponseWith<{ token: string }>> {
    return await this.authService.login(loginDto);
  }
}
