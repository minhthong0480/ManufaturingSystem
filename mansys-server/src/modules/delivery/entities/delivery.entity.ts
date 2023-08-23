import { Customer } from 'src/modules/customers/entities/customers.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('delivery')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId;

  @ManyToOne(() => Customer, (customer) => customer.deliveries)
  customer: Customer;

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
