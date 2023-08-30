import { PaginationRequestModel } from 'src/common/pagination-request-model';
export declare class FilterDeliveryNoteDto extends PaginationRequestModel {
    customerId: number;
    productId: number;
    deliveryDateFrom: Date;
    deliveryDateTo: Date;
    salesOrder: string;
    deliveryBy: string;
    remarks: string;
}
