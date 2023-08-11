import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateMaterialDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    brand: string;

    @IsOptional()
    @IsNumber()
    cost: number;

    @IsOptional()
    @IsString()
    unit: string;

    @IsOptional()
    @IsNumber()
    quantity: number;
}