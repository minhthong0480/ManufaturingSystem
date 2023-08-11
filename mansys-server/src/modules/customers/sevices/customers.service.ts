import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; // Add this line
import { Customer } from '../entities/customers.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Injectable()
export class CustomersService {
    constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

    async getAll(): Promise<Customer[]> {
        return await this.repo.find();
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


    async deleteCustomer(id: number): Promise<Customer> {
        const customer = await this.findOne(id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        return await this.repo.remove(customer);
    }


}


