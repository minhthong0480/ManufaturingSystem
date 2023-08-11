import { IsString } from "class-validator";

export class CreateCustomerDto {
    
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    taxNumber: string;
}