import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
export class CreateUserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    userRole: UserRole;
}