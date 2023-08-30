import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationRequestModel } from 'src/common/pagination-request-model';

export class FilterDeliveryNoteDto extends PaginationRequestModel {
  @IsOptional()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsDateString()
  deliveryDateFrom: Date;

  @IsOptional()
  @IsDateString()
  deliveryDateTo: Date;

  @IsOptional()
  @IsString()
  salesOrder: string;

  @IsOptional()
  @IsString()
  deliveryBy: string;

  @IsOptional()
  @IsString()
  remarks: string;
}
