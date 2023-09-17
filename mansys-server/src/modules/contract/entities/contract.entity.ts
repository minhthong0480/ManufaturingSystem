import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ContractItem } from './contract-item.entity';
import { Timeline } from '../../timeline/entities/timeline.entity';
import { ContractStatus } from 'src/modules/contract_status/entities/contract_status.entity';

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

  customerName: string;

  @Column({
    nullable: false,
  })
  userId: number;

  userName: string;

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
    precision: 17,
    scale: 2
  })
  total: number;

  @OneToMany(() => ContractItem, contractItem => contractItem.contract, {
    eager: true,
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  contractItems: ContractItem[];

  @Column({
    nullable: false
  })
  statusId : number;

  @ManyToOne(() => ContractStatus)
  @JoinColumn({ name: 'statusId' })
  status : ContractStatus;

  @OneToMany(() => Timeline, timeline => timeline.contract, {
    eager: false,
    cascade: ['insert']
  })
  timeline: Timeline[];
 
  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean = true;
}

