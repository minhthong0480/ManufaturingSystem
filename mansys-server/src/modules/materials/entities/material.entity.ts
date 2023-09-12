import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {BillOfMaterial} from "../../billOfMaterial/entities/billOfMaterial.entity"

@Entity('material')
export class Material {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        nullable: false
    })
    brand: string;

    
    @Column({
        nullable: false
    })
    unit: string;

    @Column({
        nullable: false
    })
    quantity: number;

    @Column({
        nullable: false,
        type: 'decimal',
        precision: 10,
        scale: 2,
        default : 0.0
    })
    cost: number;

    @Column({
        type: 'date',
        nullable: false,
        default: new Date(),
    })
    createDate: Date;

    @Column({
        type: 'boolean',
        nullable: false,
        default: true,
      })
    isActive: boolean = true;

    @OneToMany(() => BillOfMaterial, billOfMaterial => billOfMaterial.material)
    billOfMaterials: BillOfMaterial[];
}