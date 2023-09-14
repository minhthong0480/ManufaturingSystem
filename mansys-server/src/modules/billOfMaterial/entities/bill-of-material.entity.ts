import { Material } from '../../materials/entities/material.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class BillOfMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.billOfMaterials)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({
    nullable: true,
  })
  product_id: number;

  @ManyToOne(() => Material, (material) => material.billOfMaterials)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({
    nullable: true,
  })
  material_id: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;
}
