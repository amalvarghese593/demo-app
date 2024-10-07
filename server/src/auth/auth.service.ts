import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/schemas/user.schema';
import { SuccessResponseWith } from 'src/consts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<SuccessResponseWith<{ token: string }>> {
    const { name, email, password } = registerUserDto;

    const userAlreadyExist = await this.userService.findUser(email);

    if (userAlreadyExist) {
      throw new BadRequestException('user with email already exists');
    }

    const hashedPassword: string = await this.hashPassword(password);
    const user: UserDocument = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { success: true, token };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<SuccessResponseWith<{ token: string }>> {
    const { email, password } = loginDto;

    const user: UserDocument = await this.userService.findUser(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordMatched: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { success: true, token };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async verifyPassword(
    storedHash: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(suppliedPassword, storedHash);
  }
}
