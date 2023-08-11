import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMaterialDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    @IsNumber()
    cost: number;

    @IsNotEmpty()
    @IsString()
    unit: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}