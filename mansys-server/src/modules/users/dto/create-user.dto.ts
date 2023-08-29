import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;


  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phone: string;


  @IsOptional()
  @ApiProperty()
  userRole: UserRole;
}
