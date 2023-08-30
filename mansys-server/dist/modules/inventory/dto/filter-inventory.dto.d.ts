import { PaginationRequestModel } from 'src/common/pagination-request-model';
export declare class FilterInventoryDto extends PaginationRequestModel {
    inventoryId: number;
    productId: number;
    stockInFrom: number;
    stockInTo: number;
    stockOutFrom: number;
    stockOutTo: number;
    beginBalanceFrom: number;
    beginBalanceTo: number;
    endBalanceFrom: number;
    endBalanceTo: number;
    location: string;
    lastUpdateFrom: Date;
    lastUpdateTo: Date;
}
