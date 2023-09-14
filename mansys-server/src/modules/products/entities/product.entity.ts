import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { BillOfMaterial } from '../../billOfMaterial/entities/billOfMaterial.entity';
import { Category } from '../../category/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { DeliveryNoteItem } from 'src/modules/delivery-note/entities/delivery-note-item.entity';
import { ReceivingNoteItem } from '../../receiving-note/entities/receiving-note-item.entity';
import { Supplier } from 'src/modules/suppliers/entities/suppliers.entity';

@Entity('product')
export class Product {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: false,
    type: 'decimal',
  })
  cost: number;

  @Column({
    nullable: false,
    type: 'decimal',
  })
  price: number;

  @Column({
    type: 'date',
    nullable: false,
    default: new Date(),
  })
  createDate: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({
    nullable: false,
  })
  category_id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({
    nullable: true,
  })
  supplier_id: number;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];

  @OneToMany(() => DeliveryNoteItem, (deliveryItem) => deliveryItem.product)
  deliveryNoteItems: DeliveryNoteItem[];

  @OneToMany(
    () => ReceivingNoteItem,
    (receivingNoteItem) => receivingNoteItem.product,
  )
  receivingNoteItems: ReceivingNoteItem[];

  @OneToMany(() => BillOfMaterial, (billOfMaterial) => billOfMaterial.product)
  billOfMaterials: BillOfMaterial[];
}
