import { Product } from 'src/modules/products/entities/product.entity';
import { ReceivingNote } from 'src/modules/receiving-note/entities/receiving-note.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToMany(() => ReceivingNote, (receivingNote) => receivingNote.supplier)
  receivingNotes: ReceivingNote[];
}
