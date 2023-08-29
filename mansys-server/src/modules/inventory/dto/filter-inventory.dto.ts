import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationRequestModel } from 'src/common/pagination-request-model';

export class FilterInventoryDto extends PaginationRequestModel {
  @IsOptional()
  @IsNumber()
  inventoryId: number;

  @IsOptional()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsNumber()
  stockInFrom: number;

  @IsOptional()
  @IsNumber()
  stockInTo: number;

  @IsOptional()
  @IsNumber()
  stockOutFrom: number;

  @IsOptional()
  @IsNumber()
  stockOutTo: number;

  @IsOptional()
  @IsNumber()
  beginBalanceFrom: number;

  @IsOptional()
  @IsNumber()
  beginBalanceTo: number;

  @IsOptional()
  @IsNumber()
  endBalanceFrom: number;

  @IsOptional()
  @IsNumber()
  endBalanceTo: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsDateString()
  lastUpdateFrom: Date;

  @IsOptional()
  @IsDateString()
  lastUpdateTo: Date;
}
