import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { RegistrationStatus } from '../interfaces/registration-status.interface';
import { LoginStatus } from '../interfaces/login-status.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDto } from 'src/modules/users/dto/user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    getTokenForUser(user: User): string;
    register(userDto: CreateUserDto): Promise<RegistrationStatus>;
    login(loginUserDto: LoginUserDto): Promise<LoginStatus>;
    private _createToken;
    validateUser(payload: JwtPayload): Promise<UserDto>;
}
