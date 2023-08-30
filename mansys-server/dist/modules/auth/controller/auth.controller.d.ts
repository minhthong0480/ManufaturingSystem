import { AuthService } from '../services/auth.service';
import { LoginStatus } from '../interfaces/login-status.interface';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<LoginStatus>;
}
