import { CustomersService } from '../sevices/customers.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto as UpdateCustomerDto } from '../dtos/update-customer.dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    getAll(): Promise<import("../entities/customers.entity").Customer[]>;
    getOne(id: string): Promise<import("../entities/customers.entity").Customer>;
    create(body: CreateCustomerDto): Promise<import("../entities/customers.entity").Customer>;
    update(id: string, body: UpdateCustomerDto): Promise<import("../entities/customers.entity").Customer>;
    deactive(id: string): Promise<import("../../../common/result-model").ResultModel<import("../entities/customers.entity").Customer>>;
}
