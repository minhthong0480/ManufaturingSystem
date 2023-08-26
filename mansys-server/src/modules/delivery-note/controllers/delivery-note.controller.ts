import { Controller, Inject, Post, Body } from '@nestjs/common';
import { DeliveryNoteSerive } from '../services/delivery-note.service';
import { CreateDeliveryNoteDto } from '../dto/create-delivery-note.dto';
import { FilterDeliveryNoteDto } from '../dto/filter-delivery-note.dto';

@Controller('delivery-notes')
export class DeliveryNoteController {
  constructor(
    @Inject(DeliveryNoteSerive)
    private deliveryNoteSerive: DeliveryNoteSerive,
  ) {}

  @Post()
  create(@Body() dto: CreateDeliveryNoteDto) {
    return this.deliveryNoteSerive.create(dto);
  }

  @Post('/filter/')
  filter(@Body() dto: FilterDeliveryNoteDto) {
    return this.deliveryNoteSerive.filter(dto);
  }
}