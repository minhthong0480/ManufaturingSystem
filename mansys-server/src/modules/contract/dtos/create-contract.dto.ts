import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { ContractItem } from "../entities/contract-item.entity";
import { Timeline } from "../../timeline/entities/timeline.entity";


export class CreateContractDto {
    @IsNotEmpty()
    @ApiProperty()
    contractNumber: string;

    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsDateString()
    dateStart: Date;

    @IsNotEmpty()
    @IsDateString()
    deadline: Date;

    total: number;

    @IsArray()
    contractItems: ContractItem[];

    @IsArray()
    timeline: Timeline[];

    @IsBoolean()
    isActive: boolean;
}