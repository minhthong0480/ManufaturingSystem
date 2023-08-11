import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './sevices/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
