import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from '../modules/users/services/users.service';
import { UserRole } from '../modules/users/enums/user-role.enum';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class UsersBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersBootstrapService.name);

  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    this.logger.log('Running seeding!')
    this.createDefaultUser();
  }

  async createDefaultUser() {
    try {
      var user = await this.usersService.findOneByUsername(process.env.DEFAULT_USERNAME);
      if(user) {
        this.logger.log('Already had an admin user!');
        return;
      };

      const defaultAdmin: CreateUserDto = {
        username: process.env.DEFAULT_USERNAME,
        password: process.env.DEFAULT_PASSWORD,
        email: process.env.DEFAULT_EMAIL,
        phone: process.env.DEFAULT_PHONE,
        userRole: UserRole.admin,
      };
      await this.usersService.create(defaultAdmin);
      this.logger.log('Create a default admin user sucessfully!');

    } catch (error) {
      this.logger.log('Cannot create a default admin user!');
    }
  }
}