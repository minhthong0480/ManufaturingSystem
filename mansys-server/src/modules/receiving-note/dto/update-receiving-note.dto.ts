import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateReceivingNoteDto } from './create-receiving-note.dto';
import { ReceivingNoteItem } from '../entities/receiving-note-item.entity';

export class UpdateReceivingNoteDto extends PartialType(CreateReceivingNoteDto) {
  @IsOptional()
  receivingNoteItems: Array<ReceivingNoteItem>;
}
