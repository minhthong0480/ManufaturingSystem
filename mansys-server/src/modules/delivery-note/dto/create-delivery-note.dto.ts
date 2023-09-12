import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryNoteDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsDateString()
  deliveryDate: Date;

  @IsNotEmpty()
  @IsString()
  sales_order: string;

  @IsNotEmpty()
  @IsString()
  deliveryBy: string;

  @IsNotEmpty()
  @IsString()
  remarks: string;
}
