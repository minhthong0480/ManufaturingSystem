import { ContractItem } from '../entities/contract-item.entity';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { CreateContractItemDto } from '../dtos/create-contract-item.dto';
import { ProductsService } from '../../products/services/products.service';
import { ContractService } from './contract.service';
export declare class ContractItemService {
    private readonly contractItemRepository;
    private readonly productService;
    private readonly contractService;
    constructor(contractItemRepository: Repository<ContractItem>, productService: ProductsService, contractService: ContractService);
    deleteByContractId(contractId: number): Promise<ResultModel<boolean>>;
    deleteById(contractId: number, productId: number): Promise<ResultModel<boolean>>;
    save(createContractItemDto: CreateContractItemDto): Promise<ResultModel<string> | ResultModel<ContractItem>>;
}
