import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsNumber()
  @IsOptional() 
  quantity?: number;

  @IsNotEmpty()
  @IsDecimal()
  @IsOptional() 
  price?: number;

  @IsDecimal()
  @IsOptional()
  tax?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional() 
  sold?: number;

  @IsNumber()
  @IsOptional() 
  categoryId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMaterialDto)
  @IsOptional()
  requiredMaterials?: UpdateMaterialDto[];
}
