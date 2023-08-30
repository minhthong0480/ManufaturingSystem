import { DeliveryNoteSerive } from '../services/delivery-note.service';
import { CreateDeliveryNoteDto } from '../dto/create-delivery-note.dto';
import { FilterDeliveryNoteDto } from '../dto/filter-delivery-note.dto';
export declare class DeliveryNoteController {
    private deliveryNoteSerive;
    constructor(deliveryNoteSerive: DeliveryNoteSerive);
    create(dto: CreateDeliveryNoteDto): Promise<import("../../../common/result-model").ResultModel<CreateDeliveryNoteDto>>;
    filter(dto: FilterDeliveryNoteDto): Promise<import("../../../common/result-list-model").ResultListModel<import("../entities/delivery-note.entity").DeliveryNote>>;
}
