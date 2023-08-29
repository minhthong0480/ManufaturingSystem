import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReceivingNoteItemDto {
  @IsNotEmpty()
  @IsNumber()
  receivingNoteId: number;

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
