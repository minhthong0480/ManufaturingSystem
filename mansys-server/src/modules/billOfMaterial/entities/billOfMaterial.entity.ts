import { Material } from '../../materials/entities/material.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class BillOfMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.billOfMaterials)
  product: Product;

  @ManyToOne(() => Material, material => material.billOfMaterials)
  material: Material;

  @Column({ type: 'int', nullable: false })
  quantity: number;
}