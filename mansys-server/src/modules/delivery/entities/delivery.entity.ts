import { Customer } from 'src/modules/customers/entities/customers.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeliveryItem } from './delivery-item.entity';

@Entity('delivery')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId;

  @ManyToOne(() => Customer, (customer) => customer.deliveries)
  customer: Customer;

  @OneToMany(() => DeliveryItem, (deliveryItem) => deliveryItem.delivery)
  deliveryItems: DeliveryItem[];

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
