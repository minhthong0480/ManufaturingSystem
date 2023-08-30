import { DeliveryNote } from './delivery-note.entity';
import { Product } from '../../products/entities/product.entity';
export declare class DeliveryNoteItem {
    id: number;
    deliveryNoteId: number;
    deliveryNote: DeliveryNote;
    productId: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    remarks: string;
}
