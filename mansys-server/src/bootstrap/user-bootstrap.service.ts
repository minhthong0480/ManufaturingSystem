import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from '../modules/users/services/users.service';
import { UserRole } from '../modules/users/enums/user-role.enum';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class UsersBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersBootstrapService.name);
  
  constructor(private readonly usersService: UsersService) {}

  onApplicationBootstrap() {
    this.createDefaultUser();
  }

  async createDefaultUser() {
    try {
      await this.usersService.findOneByUsername('admin');
    } catch (error) {
      this.logger.log("Default admin not found. Creating...");
      const defaultAdmin: CreateUserDto = {
        username: 'admin',
        password: 'admin',
        userRole: UserRole.admin,
      };
      this.usersService.create(defaultAdmin);
    }
  }
}
