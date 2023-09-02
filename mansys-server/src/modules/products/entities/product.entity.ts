import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { BillOfMaterial } from '../../billOfMaterial/entities/billOfMaterial.entity';
import { Category } from '../../category/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DeliveryNoteItem } from 'src/modules/delivery-note/entities/delivery-note-item.entity';
import { ReceivingNoteItem } from '../../receiving-note/entities/receiving-note-item.entity';

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
  })
  supplier: string;

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
  category: any;

  @Column({
    nullable: false,
  })
  category_id: number;

  @ManyToOne(() => Category, (category) => category.products)
  // @JoinColumn({ category_id: 'category_id' })
  // productCategory: Category;

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
