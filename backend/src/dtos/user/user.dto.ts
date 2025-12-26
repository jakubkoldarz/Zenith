import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  lastname: string | null;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
