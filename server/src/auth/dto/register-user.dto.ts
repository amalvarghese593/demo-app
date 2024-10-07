import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { specialCharactersRegex } from 'src/consts';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'name must not be longer than 50 characters' })
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must not be longer than 50 characters' })
  @Matches(/[A-Za-z]/, { message: 'Password must contain at least 1 letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least 1 number' })
  @Matches(specialCharactersRegex, {
    message: 'Password must contain at least 1 special character',
  })
  readonly password: string;
}
