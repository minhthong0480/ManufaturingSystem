import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Supplier } from '../../suppliers/entities/suppliers.entity';
import { Material } from 'src/modules/materials/entities/material.entity';

class UpdateMaterialDto {
  @IsNumber()
  materialId: number;

  @IsNumber()
  quantity: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional() 
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional() 
  description?: string;

  @IsNotEmpty()
  @IsOptional() 
  price?: number;

  @IsNotEmpty()
  @IsOptional()
  cost?: number;

  @IsNumber()
  @IsOptional() 
  category_id?: number;

  @IsNumber()
  @IsOptional() 
  supplier_id?: number;

  @IsArray()
  @IsOptional()
  materials?: Material[];
}
