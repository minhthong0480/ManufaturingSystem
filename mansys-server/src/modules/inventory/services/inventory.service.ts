import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { ResultModel } from 'src/common/result-model';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterInventoryDto } from '../dto/filter-inventory.dto';
import { ResultListModel } from 'src/common/result-list-model';

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
      return ResultModel.fail(inventory, 'Fail');
    }

    return ResultModel.success(inventory, 'Success');
  }

  async filter(filter: FilterInventoryDto) {
    const query = this.createQueryBuilder();

    if (filter.inventoryId) {
      query.where({ id: filter.inventoryId });
    }

    if (filter.location) {
      query.andWhere('inventory.location like :location', {
        location: '%' + filter.location + '%',
      });
    }

    if (filter.productId) {
      query.andWhere({ productId: filter.productId });
    }

    if (filter.beginBalanceFrom) {
      query.andWhere('inventory.beginBalance >= :beginBalanceFrom', {
        beginBalanceFrom: filter.beginBalanceFrom,
      });
    }

    if (filter.beginBalanceTo) {
      query.andWhere('inventory.beginBalance <= :beginBalanceTo', {
        beginBalanceTo: filter.beginBalanceTo,
      });
    }

    if (filter.endBalanceFrom) {
      query.andWhere('inventory.endBalance >= :endBalanceFrom', {
        endBalanceFrom: filter.endBalanceFrom,
      });
    }

    if (filter.endBalanceTo) {
      query.andWhere('inventory.endBalance <= :endBalanceTo', {
        endBalanceTo: filter.endBalanceTo,
      });
    }

    if (filter.stockInFrom) {
      query.andWhere('inventory.stockIn >= :stockInFrom', {
        stockInFrom: filter.stockInFrom,
      });
    }

    if (filter.stockInTo) {
      query.andWhere('inventory.stockIn <= :stockInTo', {
        stockInTo: filter.stockInTo,
      });
    }

    if (filter.stockOutFrom) {
      query.andWhere('inventory.stockOut >= :stockOutFrom', {
        stockOutFrom: filter.stockOutFrom,
      });
    }

    if (filter.stockOutTo) {
      query.andWhere('inventory.stockOut <= :stockOutTo', {
        stockOutTo: filter.stockOutTo,
      });
    }

    if (filter.lastUpdateFrom) {
      query.andWhere('inventory.lastUpdate >= :lastUpdateFrom', {
        lastUpdateFrom: filter.lastUpdateFrom,
      });
    }

    if (filter.lastUpdateTo) {
      query.andWhere('inventory.lastUpdate <= :lastUpdateTo', {
        lastUpdateTo: filter.lastUpdateTo,
      });
    }

    const totalRows = await query.getCount();

    const skip = (filter.page - 1) * filter.pageSize;
    query.offset(skip).limit(filter.pageSize);

    const inventories = await query.getMany();
    return ResultListModel.success(
      inventories,
      totalRows,
      'All filtered inventories',
    );
  }

  async getOneByProductId(productId: number) {
    return await this.inventoryRepository.findOneBy({ productId });
  }

  async save(inventory: Inventory) {
    return await this.inventoryRepository.save(inventory);
  }

  createQueryBuilder() {
    return this.inventoryRepository.createQueryBuilder('inventory');
  }
}
