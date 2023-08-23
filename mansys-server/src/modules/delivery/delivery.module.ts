import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Global, Module } from '@nestjs/common';
import { DeliveryItem } from './entities/delivery-item.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Delivery, DeliveryItem])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DeliveryModule {}
