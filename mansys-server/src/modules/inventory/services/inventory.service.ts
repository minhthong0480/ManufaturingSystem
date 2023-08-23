import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { ResultModel } from 'src/common/result-model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    if (!createInventoryDto.lastUpdate) {
      createInventoryDto.lastUpdate = new Date();
    }

    const inventory = await this.inventoryRepository.save(createInventoryDto);
    if (!inventory) {
      return ResultModel.fail(inventory,"Fail");
    }

    return ResultModel.success(inventory,"Success");
  }
}
