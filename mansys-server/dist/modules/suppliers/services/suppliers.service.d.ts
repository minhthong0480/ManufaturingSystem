import { Supplier } from '../entities/suppliers.entity';
import { Repository } from 'typeorm';
export declare class SupplierService {
    private readonly supplierRepository;
    constructor(supplierRepository: Repository<Supplier>);
    getOneById(id: number): Promise<Supplier>;
}
