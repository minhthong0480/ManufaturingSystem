import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryService } from './services/inventory.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService]
})
export class InventoryModule {}
