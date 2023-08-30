import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { ResultModel } from 'src/common/result-model';
import { FilterInventoryDto } from '../dto/filter-inventory.dto';
import { ResultListModel } from 'src/common/result-list-model';
export declare class InventoryService {
    private readonly inventoryRepository;
    constructor(inventoryRepository: Repository<Inventory>);
    create(createInventoryDto: CreateInventoryDto): Promise<ResultModel<CreateInventoryDto & Inventory>>;
    filter(filter: FilterInventoryDto): Promise<ResultListModel<Inventory>>;
    getOneByProductId(productId: number): Promise<Inventory>;
    save(inventory: Inventory): Promise<Inventory>;
    createQueryBuilder(): import("typeorm").SelectQueryBuilder<Inventory>;
}
