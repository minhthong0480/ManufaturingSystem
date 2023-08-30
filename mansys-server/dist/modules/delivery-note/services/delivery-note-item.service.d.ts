import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { DeliveryNoteItem } from '../entities/delivery-note-item.entity';
import { CreateDeliveryNoteItemDto } from '../dto/create-delivery-note-item.dto';
import { ProductsService } from 'src/modules/products/services/products.service';
import { DeliveryNoteSerive } from './delivery-note.service';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';
export declare class DeliveryNoteItemSerive {
    private readonly deliveryNoteItemRepository;
    private readonly productsService;
    private readonly deliveryNoteSerive;
    private readonly inventoryService;
    constructor(deliveryNoteItemRepository: Repository<DeliveryNoteItem>, productsService: ProductsService, deliveryNoteSerive: DeliveryNoteSerive, inventoryService: InventoryService);
    create(dto: CreateDeliveryNoteItemDto): Promise<ResultModel<CreateDeliveryNoteItemDto>>;
}
