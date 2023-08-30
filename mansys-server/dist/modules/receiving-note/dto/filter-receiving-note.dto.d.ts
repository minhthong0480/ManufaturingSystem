import { PaginationRequestModel } from 'src/common/pagination-request-model';
export declare class FilterReceivingNoteDto extends PaginationRequestModel {
    supplierId: number;
    productId: number;
    receiptDateFrom: Date;
    receiptDateTo: Date;
    purchaseOrder: string;
    receivedBy: string;
    remarks: string;
}
