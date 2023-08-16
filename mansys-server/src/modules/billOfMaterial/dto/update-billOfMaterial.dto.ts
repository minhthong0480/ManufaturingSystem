import { IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateMaterialDto {
  @IsNumber()
  materialId: number;

  @IsNumber()
  quantity: number;
}

export class UpdateBillOfMaterialDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMaterialDto)
  materials: UpdateMaterialDto[];
}
