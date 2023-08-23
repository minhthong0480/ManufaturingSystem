import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { ReceivingNote } from './entities/receiving-note.entity';
import { ReceivingNoteItem } from './entities/receiving-note-item.entity';
import { SupplierModule } from '../suppliers/suppliers.module';
import { ReceivingNoteService } from './services/receiving-note.service';
import { ReceivingNoteItemService } from './services/receiving-note-item.service';
import { ReceivingNoteController } from './controllers/receiving-note.controller';
import { ReceivingNoteItemController } from './controllers/receiving-note-item.controller';
import { ProductsModule } from '../products/products.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ReceivingNote, ReceivingNoteItem]),
    SupplierModule,
    ProductsModule,
  ],
  controllers: [ReceivingNoteController, ReceivingNoteItemController],
  providers: [ReceivingNoteService, ReceivingNoteItemService],
  exports: [],
})
export class ReceivingNoteModule {}
