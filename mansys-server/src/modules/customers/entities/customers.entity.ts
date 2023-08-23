import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  taxNumber: string;

  @OneToMany(() => Delivery, (delivery) => delivery.customer)
  deliveries: Delivery[];

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean = true;
}
