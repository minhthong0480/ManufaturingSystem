import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationRequestModel } from 'src/common/pagination-request-model';

export class FilterReceivingNoteDto extends PaginationRequestModel {
  @IsOptional()
  @IsNumber()
  supplierId: number;

  @IsOptional()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsDateString()
  receiptDateFrom: Date;

  @IsOptional()
  @IsDateString()
  receiptDateTo: Date;

  @IsOptional()
  @IsString()
  purchaseOrder: string;

  @IsOptional()
  @IsString()
  receivedBy: string;

  @IsOptional()
  @IsString()
  remarks: string;
}
