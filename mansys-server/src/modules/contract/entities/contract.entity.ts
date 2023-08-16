import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContractItem } from './contractItem.entity';
@Entity('contract')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    length : 100
  })
  contractNumber: string;

  @Column({
    nullable: false,
  })
  customerId: number;

  @Column({
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'date',
    nullable: false
  })
  dateStart: Date;

  @Column({
    type: 'date',
    nullable: false
  })
   deadline: Date;

@Column({ 
    type: 'decimal',
    precision: 10,
    scale: 2 })
  total: number;

  @OneToMany(() => ContractItem, contractItem => contractItem.contract)
  contractItems: ContractItem[];

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean = true;
}

