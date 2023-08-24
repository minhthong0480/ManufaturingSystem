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
  purchaseOrder: string;

  @IsNotEmpty()
  @IsString()
  receivedBy: string;

  @IsNotEmpty()
  @IsString()
  remarks: string;
}
