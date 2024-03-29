import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customers.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { ResultModel } from '../../../common/result-model';
import { ResultListModel } from '../../../common/result-list-model';

@Injectable()
export class CustomersService {
    constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

    async getAll(): Promise<ResultModel<Customer[]>> {
        const result = await this.repo.find();
        return ResultModel.success(result, null);
    }

    async findOne(id: number): Promise<Customer> {
        const customer = await this.repo.findOneBy({id});
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        return customer;
    }
    
    
    async createCustomer(body: CreateCustomerDto): Promise<Customer> {
        const customer = this.repo.create(body);
        return await this.repo.save(customer);
    }



    async updateCustomer(id: number,attrs: Partial<Customer>): Promise<Customer> {
        const customer = await this.findOne(id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        Object.assign(customer,attrs);
        return await this.repo.save(customer);
    }


    // async deleteCustomer(id: number): Promise<Customer> {
    //     const customer = await this.findOne(id);
    //     if (!customer) {
    //         throw new NotFoundException('Customer not found');
    //     }
    //     return await this.repo.remove(customer);
    // }

    async deactiveCustomer(id: number): Promise<ResultModel<Customer>> {
        const customer = await this.findOne(id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        customer.isActive = false;
        await this.repo.save(customer);
        return ResultModel.success(customer,'Deactive customer successfully');
    }


}
