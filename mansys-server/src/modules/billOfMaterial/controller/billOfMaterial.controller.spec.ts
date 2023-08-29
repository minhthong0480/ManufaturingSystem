import { Test, TestingModule } from '@nestjs/testing';
import { BillOfMaterialController } from './billOfMaterial.controller';

describe('BillOfMaterialController', () => {
  let controller: BillOfMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillOfMaterialController],
    }).compile();

    controller = module.get<BillOfMaterialController>(BillOfMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
