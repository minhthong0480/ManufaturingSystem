import { IsOptional, IsString, IsDate, IsDecimal, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequestModel } from 'src/common/pagination-request-model';
import { Transform } from 'class-transformer';

export class ContractFilterDTO extends PaginationRequestModel{
  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsString()
  contractNumber?: string;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsDate()
  startDeadline?: Date;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsDate()
  endDeadline?: Date;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsDecimal()
  minTotal?: number;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsDecimal()
  maxTotal?: number;

  @ApiProperty({
    required : false
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value} ) => value === 'true')
  isActive?: boolean;

  @IsOptional()
  listOfStatus?: string;
}

