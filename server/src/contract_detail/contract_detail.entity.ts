/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import {Contract} from '../contract/contract.entity';

@Entity()
export class ContractDetail extends BaseEntity {
    // @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Contract, {eager: true})
    @JoinColumn({name: 'contract_id'})
    contract_id: Contract;

    @Column()
    product_id: string;

    @Column('int')
    quantity: number;

}