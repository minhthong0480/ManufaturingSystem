import { ReceivingNoteItemService } from '../services/receiving-note-item.service';
import { CreateReceivingNoteItemDto } from '../dto/create-receiving-note-item.dto';
export declare class ReceivingNoteItemController {
    private receivingNoteItemService;
    constructor(receivingNoteItemService: ReceivingNoteItemService);
    create(dto: CreateReceivingNoteItemDto): Promise<import("../../../common/result-model").ResultModel<string> | import("../../../common/result-model").ResultModel<CreateReceivingNoteItemDto & import("../entities/receiving-note-item.entity").ReceivingNoteItem>>;
}
