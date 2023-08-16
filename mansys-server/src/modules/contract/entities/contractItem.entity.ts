import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Contract } from './contract.entity';

@Entity('contract_products')
export class ContractItem {
  @PrimaryColumn()
  contractId: number;

  @PrimaryColumn()
  productId: number;


  @ManyToOne(() => Contract, contract => contract.contractItems)
  contract: Contract;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean = true;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

