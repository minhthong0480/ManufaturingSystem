import { Module } from '@nestjs/common';
import { BillOfMaterialService } from './services/bill-of-material.service';
import { BillOfMaterialController } from './controller/bill-of-material.controller';
import { BillOfMaterial } from './entities/bill-of-material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BillOfMaterial])],
  providers: [BillOfMaterialService],
  controllers: [BillOfMaterialController],
})
export class BillOfMaterialModule {}
