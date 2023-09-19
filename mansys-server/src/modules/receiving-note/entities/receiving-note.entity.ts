import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Supplier } from 'src/modules/suppliers/entities/suppliers.entity';
import { ReceivingNoteItem } from './receiving-note-item.entity';

@Entity('receiving_notes')
export class ReceivingNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplierId: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.receivingNotes)
  supplier: Supplier;

  @OneToMany(
    () => ReceivingNoteItem,
    (receivingNoteItem) => receivingNoteItem.receivingNote,
    {
      eager: true,
    },
  )
  receivingNoteItems: ReceivingNoteItem[];

  @Column({
    nullable: false,
    type: 'date'
  })
  receiptDate: Date;

  @Column({
    nullable: false,
    default: false
  })
  approval: boolean;

  @Column({
    nullable: false,
  })
  purchaseOrder: string;

  @Column({
    nullable: false,
  })
  receivedBy: string;

  @Column({
    nullable: true,
  })
  remarks: string;
}
