import { IsOptional, IsString } from "class-validator";

export class updateCustomerDto {
    
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    taxNumber: string;

}