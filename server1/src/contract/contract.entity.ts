import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}