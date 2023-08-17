import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Timeline } from '../../timeline/entities/timeline.entity'

@Entity('contract_status')
export class ContractStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: false,
        length: 254
    })
    description: string;

    @Column({
        nullable: true,
    })
    previous_stage_ids: string;

    @Column({
        nullable: true,
    })
    next_stage_ids: string;

    @OneToMany(() => Timeline, timeline => timeline.contractStatus)
    timeline: Timeline[];
}