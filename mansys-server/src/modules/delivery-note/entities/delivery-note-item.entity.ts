import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryNote } from './delivery-note.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('delivery_note_items')
export class DeliveryNoteItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deliveryId: number;

  @ManyToOne(() => DeliveryNote, (delivery) => delivery.deliveryNoteItems)
  deliveryNote: DeliveryNote;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.deliveryNoteItems)
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
