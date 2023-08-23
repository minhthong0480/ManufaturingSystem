import { Customer } from 'src/modules/customers/entities/customers.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeliveryNoteItem } from './delivery-note-item.entity';

@Entity('delivery_notes')
export class DeliveryNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId;

  @ManyToOne(() => Customer, (customer) => customer.deliverieNotes)
  customer: Customer;

  @OneToMany(
    () => DeliveryNoteItem,
    (deliveryNoteItem) => deliveryNoteItem.deliveryNote,
  )
  deliveryNoteItems: DeliveryNoteItem[];

  @Column({
    nullable: false,
  })
  deliveryDate: Date;

  @Column({
    nullable: false,
  })
  sales_order: string;

  @Column({
    nullable: false,
  })
  deliveryBy: string;

  @Column({
    nullable: true,
  })
  remarks: string;
}
