import { Supplier } from 'src/modules/suppliers/entities/suppliers.entity';
import { ReceivingNoteItem } from './receiving-note-item.entity';
export declare class ReceivingNote {
    id: number;
    supplierId: number;
    supplier: Supplier;
    receivingNoteItems: ReceivingNoteItem[];
    receiptDate: Date;
    purchaseOrder: string;
    receivedBy: string;
    remarks: string;
}
