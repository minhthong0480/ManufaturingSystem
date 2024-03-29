import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  productId: number;

  @ManyToOne(() => Product, (Product) => Product.inventories)
  product: Product;

  @Column({
    nullable: false,
  })
  stockIn: number;

  @Column({
    nullable: false,
  })
  stockOut: number;

  @Column({
    nullable: false,
  })
  beginBalance: number;

  @Column({
    nullable: false,
  })
  endBalance: number;

  @Column({
    nullable: false,
  })
  location: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  lastUpdate: Date;
}
