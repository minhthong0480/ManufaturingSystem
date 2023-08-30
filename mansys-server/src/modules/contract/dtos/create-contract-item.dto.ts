import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateContractItemDto {
    @IsNotEmpty()
    @IsNumber()
    contractId: number;

    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}