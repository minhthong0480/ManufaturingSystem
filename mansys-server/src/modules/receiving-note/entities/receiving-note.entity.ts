import { Customer } from 'src/modules/customers/entities/customers.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Supplier } from 'src/modules/suppliers/entities/suppliers.entity';
import { ReceivingNoteItem } from './receiving-note-item.entity';

@Entity('receiving-note')
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
  )
  receivingNoteItems: ReceivingNoteItem[];

  @Column({
    nullable: false,
  })
  receiptDate: Date;

  @Column({
    nullable: false,
  })
  purchase_order: string;

  @Column({
    nullable: false,
  })
  receivedBy: string;

  @Column({
    nullable: true,
  })
  remarks: string;
}
