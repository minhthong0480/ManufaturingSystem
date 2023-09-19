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
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.deliverieNotes)
  customer: Customer;

  @OneToMany(
    () => DeliveryNoteItem,
    (deliveryNoteItem) => deliveryNoteItem.deliveryNote,
    {
      eager: true,
    },
  )
  deliveryNoteItems: DeliveryNoteItem[];

  @Column({
    nullable: false,
    type: 'date',
  })
  deliveryDate: Date;

  @Column({
    nullable: false,
    default: false
  })
  approval: boolean;

  @Column({
    nullable: false,
  })
  salesOrder: string;

  @Column({
    nullable: false,
  })
  deliveryBy: string;

  @Column({
    nullable: true,
  })
  remarks: string;
}
