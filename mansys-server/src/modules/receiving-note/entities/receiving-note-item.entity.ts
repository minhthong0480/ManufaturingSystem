import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ReceivingNote } from './receiving-note.entity';

@Entity('receiving-note-item')
export class ReceivingNoteItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  receivingNoteId: number;

  @ManyToOne(() => ReceivingNote, (receivingNote) => receivingNote.receivingNoteItems)
  receivingNote: ReceivingNote;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.receivingNoteItems)
  product: Product;

  @Column({
    nullable: false,
  })
  quantity: number;

  @Column({
    nullable: false,
    type: 'decimal',
  })
  unitPrice: number;

  @Column({
    nullable: false,
    type: 'decimal',
  })
  totalPrice: number;

  @Column({
    nullable: true,
  })
  remarks: string;
}
