import { IsNotEmpty } from "class-validator";

// hiding unwanted fields since this dto is used to expose to the public
export class UserDto {
    @IsNotEmpty() id: number;
    @IsNotEmpty() username: string;
}