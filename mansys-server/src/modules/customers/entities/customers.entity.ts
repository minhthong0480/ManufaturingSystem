import { DeliveryNote } from 'src/modules/delivery-note/entities/delivery-note.entity';
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

  @OneToMany(() => DeliveryNote, (delivery) => delivery.customer)
  deliverieNotes: DeliveryNote[];

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean = true;
}
