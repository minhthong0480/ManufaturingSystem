import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryNoteItemDto {
  @IsNotEmpty()
  @IsNumber()
  deliveryId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  remarks: string;
}
