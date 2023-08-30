import { PaginationRequestModel } from 'src/common/pagination-request-model';
export declare class ContractFilterDTO extends PaginationRequestModel {
    contractNumber?: string;
    customerName?: string;
    userName?: string;
    startDate?: Date;
    endDate?: Date;
    startDeadline?: Date;
    endDeadline?: Date;
    minTotal?: number;
    maxTotal?: number;
}
