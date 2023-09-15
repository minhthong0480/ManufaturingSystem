import { IsDate, IsDateString, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { PaginationRequestModel } from 'src/common/pagination-request-model';
import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto extends PaginationRequestModel {
  @ApiProperty()
  @IsOptional()
  role: UserRole;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  joinDateFrom: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  joinDateTo: Date;

  @ApiProperty()
  @IsOptional()
  name:string;

  @ApiProperty()
  @IsOptional()
  isActive:boolean;
}
