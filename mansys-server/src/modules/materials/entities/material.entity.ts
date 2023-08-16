import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {BillOfMaterial} from "../../billOfMaterial/entities/billOfMaterial.entity"

@Entity('material')
export class Material {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar'
    })
    name: string;

    @Column({
        nullable: false
    })
    brand: string;

    @Column({
        nullable: false,
        type: 'decimal'
    })
    cost: number;

    @Column({
        nullable: false,
        type: 'varchar'
    })
    unit: string;

    @Column({
        nullable: false,
        type: 'int'
    })
    quantity: number;

    @Column({
        type: 'date',
        nullable: false,
        default: new Date(),
    })
    createDate: Date;

    @OneToMany(() => BillOfMaterial, billOfMaterial => billOfMaterial.material)
    billOfMaterials: BillOfMaterial[];
}