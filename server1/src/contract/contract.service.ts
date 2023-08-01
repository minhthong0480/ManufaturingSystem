import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContractService {
    constructor(@InjectRepository(Contract) private repo: Repository<Contract>) {}

    create(name: string) {
        const contract = this.repo.create({name});
        return this.repo.save(contract);
    }

    async getOne(id: number) {
        const contract = await this.repo.findOneBy({id});
        if (!contract) {
            throw new Error('contract not found');
        }
        return contract;
    }

    async delete(id: number) {
        const contract = await this.getOne(id);
        return this.repo.remove(contract);
    }
}
