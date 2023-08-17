import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContractItem } from './contract-item.entity';
import { Timeline } from '../../timeline/entities/timeline.entity';

@Entity('contract')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    length: 100
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
    scale: 2
  })
  total: number;

  @OneToMany(() => ContractItem, contractItem => contractItem.contract, {
    eager: false,
    cascade: ['insert']
  })
  contractItems: ContractItem[];

  // @OneToMany(() => Timeline, timeline => timeline.contract)
  // timeline: Timeline[];

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean = true;
}

