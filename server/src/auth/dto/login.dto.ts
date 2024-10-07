import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Password must not be longer than 50 characters' })
  readonly password: string;
}
