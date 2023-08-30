import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  stockIn: number;

  @IsNotEmpty()
  @IsNumber()
  stockOut: number;

  @IsNotEmpty()
  @IsNumber()
  beginBalance: number;

  @IsNotEmpty()
  @IsNumber()
  endBalance: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsDateString()
  lastUpdate: Date;
}
