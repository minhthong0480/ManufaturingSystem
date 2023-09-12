import { IsNotEmpty, IsIn, IsOptional } from "class-validator";

export class GetProductsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}