import { UserRole } from '../enums/user-role.enum';
import { PaginationRequestModel } from 'src/common/pagination-request-model';
export declare class FilterUserDto extends PaginationRequestModel {
    role: UserRole;
    username: string;
    email: string;
    phone: string;
    id: number;
    joinDateFrom: Date;
    joinDateTo: Date;
}
