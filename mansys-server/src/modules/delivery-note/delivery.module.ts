import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryNote } from './entities/delivery-note.entity';
import { Global, Module } from '@nestjs/common';
import { DeliveryNoteItem } from './entities/delivery-note-item.entity';
import { DeliveryNoteSerive } from './services/delivery-note.service';
import { DeliveryNoteController } from './controllers/delivery-note.controller';
import { CustomersModule } from '../customers/customers.module';
import { DeliveryNoteItemController } from './controllers/delivery-note-item.controller';
import { DeliveryNoteItemSerive } from './services/delivery-note-item.service';
import { ProductsModule } from '../products/products.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryNote, DeliveryNoteItem]),
    CustomersModule,
    ProductsModule
  ],
  controllers: [DeliveryNoteController, DeliveryNoteItemController],
  providers: [DeliveryNoteSerive, DeliveryNoteItemSerive],
  exports: [],
})
export class DeliveryNoteModule {}
