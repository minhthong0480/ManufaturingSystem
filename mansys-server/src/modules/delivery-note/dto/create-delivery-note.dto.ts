import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DeliveryNoteItem } from '../entities/delivery-note-item.entity';

export class CreateDeliveryNoteDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  deliveryDate: Date;

  @IsNotEmpty()
  @IsString()
  salesOrder: string;

  @IsNotEmpty()
  @IsString()
  deliveryBy: string;

  @IsNotEmpty()
  @IsString()
  remarks: string;

  @IsOptional()
  deliveryNoteItems: Array<DeliveryNoteItem>;
}
