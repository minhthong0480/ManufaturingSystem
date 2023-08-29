import { Module } from '@nestjs/common';
import { BillOfMaterialService } from './services/billOfMaterial.service';
import { BillOfMaterialController } from './controller/billOfMaterial.controller';

@Module({
  providers: [BillOfMaterialService],
  controllers: [BillOfMaterialController]
})
export class BillOfMaterialModule {}
