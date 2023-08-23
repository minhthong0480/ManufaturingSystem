import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { ReceivingNote } from './entities/receiving-note.entity';
import { ReceivingNoteItem } from './entities/receiving-note-item.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ReceivingNote, ReceivingNoteItem])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ReceivingNoteModule {}
