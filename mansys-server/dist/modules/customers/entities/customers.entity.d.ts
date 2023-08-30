import { DeliveryNote } from 'src/modules/delivery-note/entities/delivery-note.entity';
export declare class Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    taxNumber: string;
    deliverieNotes: DeliveryNote[];
    isActive: boolean;
}
