import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
  @IsOptional()
  userRole: UserRole;
}
