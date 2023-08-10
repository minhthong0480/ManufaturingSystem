import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    cost: number;

    @Column()
    unit: string;

    @Column()
    quantity: number;
}