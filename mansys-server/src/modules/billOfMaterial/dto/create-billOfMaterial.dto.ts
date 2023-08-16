import { IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MaterialDto {
  @IsNumber()
  materialId: number;

  @IsNumber()
  quantity: number;
}

export class CreateBillOfMaterialDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialDto)
  materials: MaterialDto[];
}
