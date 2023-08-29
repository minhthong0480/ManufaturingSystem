import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;


    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    taxNumber: string;
}