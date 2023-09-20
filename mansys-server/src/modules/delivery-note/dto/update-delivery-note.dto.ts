import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryNoteDto } from './create-delivery-note.dto';
import { IsOptional } from 'class-validator';
import { DeliveryNoteItem } from '../entities/delivery-note-item.entity';

export class UpdateDeliveryNoteDto extends PartialType(CreateDeliveryNoteDto) {
}
