/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import {Contract} from '../contract/contract.entity';

@Entity()
export class ContractDetail extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Contract, {eager: true})
    @JoinColumn({name: 'contract_id'})
    contract_id: Contract;

    @Column()
    product_id: string;

    @Column('int')
    quantity: number;

}