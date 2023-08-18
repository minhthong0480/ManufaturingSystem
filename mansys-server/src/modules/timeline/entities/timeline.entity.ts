import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Contract } from '../../contract/entities/contract.entity';
import { ContractStatus } from '../../contract_status/entities/contract_status.entity';

@Entity('timeline')
export class Timeline {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => ContractStatus, contractStatus => contractStatus.timeline)
    contractStatus: ContractStatus;

    @ManyToOne(() => Contract, contract => contract.timeline)
    contract: Contract;


    @ManyToOne(() => User, user => user.timeline)
    user: User;

    @Column()
    time: string;

}