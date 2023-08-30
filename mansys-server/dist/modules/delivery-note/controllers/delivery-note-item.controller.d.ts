import { DeliveryNoteItemSerive } from '../services/delivery-note-item.service';
import { CreateDeliveryNoteItemDto } from '../dto/create-delivery-note-item.dto';
export declare class DeliveryNoteItemController {
    private deliveryNoteItemSerive;
    constructor(deliveryNoteItemSerive: DeliveryNoteItemSerive);
    create(dto: CreateDeliveryNoteItemDto): Promise<import("../../../common/result-model").ResultModel<CreateDeliveryNoteItemDto>>;
}
