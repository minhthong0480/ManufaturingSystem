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
  @IsString()
  supplier: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  // @IsNotEmpty()
  // @IsNumber()
  // quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  // @IsOptional()
  // @IsDecimal()
  // tax?: number;

  // @IsNotEmpty()
  // @IsNumber()
  // sold: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => MaterialDto)
  // requiredMaterials: MaterialDto[];
}
