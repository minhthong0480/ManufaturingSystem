import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        nullable: false,
    })
    brand: string;

    @Column({
        nullable: false,
    })
    cost: number;

    @Column({
        nullable: false,
    })
    unit: string;

    @Column({
        nullable: false,
    })
    quantity: number;
}