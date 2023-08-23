import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryNote } from './entities/delivery-note.entity';
import { Global, Module } from '@nestjs/common';
import { DeliveryNoteItem } from './entities/delivery-note-item.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([DeliveryNote, DeliveryNoteItem])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DeliveryNoteModule {}
