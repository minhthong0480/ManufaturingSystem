import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Delivery } from './delivery.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('delivery-item')
export class DeliveryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deliveryId: number;

  @ManyToOne(() => Delivery, (delivery) => delivery.deliveryItems)
  delivery: Delivery;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.deliveryItems)
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
