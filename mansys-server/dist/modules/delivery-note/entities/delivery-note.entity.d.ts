import { Customer } from 'src/modules/customers/entities/customers.entity';
import { DeliveryNoteItem } from './delivery-note-item.entity';
export declare class DeliveryNote {
    id: number;
    customerId: number;
    customer: Customer;
    deliveryNoteItems: DeliveryNoteItem[];
    deliveryDate: Date;
    salesOrder: string;
    deliveryBy: string;
    remarks: string;
}
