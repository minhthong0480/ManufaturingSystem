import { Body, Controller, Inject, Post } from '@nestjs/common';
import { DeliveryNoteItemSerive } from '../services/delivery-note-item.service';
import { CreateDeliveryNoteItemDto } from '../dto/create-delivery-note-item.dto';

@Controller('delivery-note-items')
export class DeliveryNoteItemController {
  constructor(
    @Inject(DeliveryNoteItemSerive)
    private deliveryNoteItemSerive: DeliveryNoteItemSerive,
  ) {}

  @Post()
  create(@Body() dto: CreateDeliveryNoteItemDto) {
    return this.deliveryNoteItemSerive.create(dto);
  }
}
