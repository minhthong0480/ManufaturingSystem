import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DeliveryModule {}
