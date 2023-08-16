import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MaterialDto {
  @IsNumber()
  materialId: number;

  @IsNumber()
  quantity: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsDecimal()
  tax?: number;

  @IsNotEmpty()
  @IsNumber()
  sold: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialDto)
  requiredMaterials: MaterialDto[];
}
