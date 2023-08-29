import { ReceivingNote } from 'src/modules/receiving-note/entities/receiving-note.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ReceivingNote, (receivingNote) => receivingNote.supplier)
  receivingNotes: ReceivingNote[];
}
