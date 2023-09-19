import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReceivingNoteItem } from '../entities/receiving-note-item.entity';

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

  @IsOptional()
  receivingNoteItems: Array<ReceivingNoteItem>;
}
