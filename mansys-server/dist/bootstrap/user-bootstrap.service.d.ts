import { OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from '../modules/users/services/users.service';
export declare class UsersBootstrapService implements OnApplicationBootstrap {
    private readonly usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    onApplicationBootstrap(): Promise<void>;
    createDefaultUser(): Promise<void>;
}
