import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryNoteDto } from './create-delivery-note.dto';

export class UpdateDeliveryNoteDto extends PartialType(CreateDeliveryNoteDto) {
}