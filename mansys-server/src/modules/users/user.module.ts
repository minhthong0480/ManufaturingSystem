import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { UsersBootstrapService } from '../../bootstrap/user-bootstrap.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersBootstrapService, JwtService],
  exports: [UsersService]
})
export class UserModule {}
