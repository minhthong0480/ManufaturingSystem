import { Repository } from 'typeorm';
import { Customer } from '../entities/customers.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { ResultModel } from '../../../common/result-model';
export declare class CustomersService {
    private repo;
    constructor(repo: Repository<Customer>);
    getAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    createCustomer(body: CreateCustomerDto): Promise<Customer>;
    updateCustomer(id: number, attrs: Partial<Customer>): Promise<Customer>;
    deactiveCustomer(id: number): Promise<ResultModel<Customer>>;
}
