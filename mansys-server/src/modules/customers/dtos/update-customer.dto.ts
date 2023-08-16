import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCustomerDto {
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;


    @ApiProperty()
    @IsOptional()
    @IsString()
    taxNumber: string;

}