import { ReceivingNoteItem } from '../entities/receiving-note-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/modules/products/services/products.service';
import { CreateReceivingNoteItemDto } from '../dto/create-receiving-note-item.dto';
import { ResultModel } from 'src/common/result-model';
import { ReceivingNoteService } from './receiving-note.service';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';
export declare class ReceivingNoteItemService {
    private readonly receivingNoteItemRepository;
    private readonly receivingNoteService;
    private readonly productService;
    private readonly inventoryService;
    constructor(receivingNoteItemRepository: Repository<ReceivingNoteItem>, receivingNoteService: ReceivingNoteService, productService: ProductsService, inventoryService: InventoryService);
    create(dto: CreateReceivingNoteItemDto): Promise<ResultModel<string> | ResultModel<CreateReceivingNoteItemDto & ReceivingNoteItem>>;
}
