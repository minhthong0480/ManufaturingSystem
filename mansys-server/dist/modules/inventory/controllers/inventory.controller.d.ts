import { InventoryService } from '../services/inventory.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { FilterInventoryDto } from '../dto/filter-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(inventory: CreateInventoryDto): Promise<import("../../../common/result-model").ResultModel<CreateInventoryDto & import("../entities/inventory.entity").Inventory>>;
    findWithFilder(filter: FilterInventoryDto): Promise<import("../../../common/result-list-model").ResultListModel<import("../entities/inventory.entity").Inventory>>;
}
