/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Contract extends BaseEntity {
    @PrimaryColumn()
    id: string;



}