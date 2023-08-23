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
    const page = parseInt(filter.page as any) || 1;
    const limit = parseInt(filter.pageSize as any) || 10;

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

    const skip = (page - 1) * limit;
    query.offset(skip).limit(limit);

    const inventories = await query.getMany();
    return ResultListModel.success(
      inventories,
      totalRows,
      'All filtered inventories',
    );
  }

  createQueryBuilder() {
    return this.inventoryRepository.createQueryBuilder('inventory');
  }
}
