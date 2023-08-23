import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReceivingNoteDto {
  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @IsNotEmpty()
  @IsDateString()
  receiptDate: Date;

  @IsNotEmpty()
  @IsString()
  purchase_order: string;

  @IsNotEmpty()
  @IsString()
  receivedBy: string;

  @IsNotEmpty()
  @IsString()
  remarks: string;
}
