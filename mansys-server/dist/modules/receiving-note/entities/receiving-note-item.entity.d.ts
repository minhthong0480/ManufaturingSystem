import { Product } from '../../products/entities/product.entity';
import { ReceivingNote } from './receiving-note.entity';
export declare class ReceivingNoteItem {
    id: number;
    receivingNoteId: number;
    receivingNote: ReceivingNote;
    productId: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    remarks: string;
}
