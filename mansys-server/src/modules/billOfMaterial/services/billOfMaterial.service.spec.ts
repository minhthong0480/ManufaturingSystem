import { Test, TestingModule } from '@nestjs/testing';
import { BillOfMaterialService } from './billOfMaterial.service';

describe('BillOfMaterialService', () => {
  let service: BillOfMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillOfMaterialService],
    }).compile();

    service = module.get<BillOfMaterialService>(BillOfMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
