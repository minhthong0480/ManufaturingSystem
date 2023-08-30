import { Contract } from '../entities/contract.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { ResultModel } from 'src/common/result-model';
import { ContractFilterDTO } from '../dtos/filter-contract.dto';
import { ResultListModel } from 'src/common/result-list-model';
import { UpdateContactDto } from '../dtos/update-contract.dto';
import { ContractItemService } from './contract-item.service';
export declare class ContractService {
    private readonly contractRepository;
    private readonly contractItemService;
    constructor(contractRepository: Repository<Contract>, contractItemService: ContractItemService);
    create(createContractDto: CreateContractDto): Promise<ResultModel<Contract>>;
    filter(filterDto: ContractFilterDTO): Promise<ResultListModel<Contract>>;
    deactivate(id: number): Promise<ResultModel<boolean>>;
    update(id: number, updateContractDto: UpdateContactDto): Promise<ResultModel<string> | ResultModel<{
        contractNumber: string;
        customerId: number;
        userId: number;
        dateStart: Date;
        deadline: Date;
        total: number;
        contractItems: import("../entities/contract-item.entity").ContractItem[];
        isActive: boolean;
        id: number;
        timeline: import("../../timeline/entities/timeline.entity").Timeline[];
    } & Contract>>;
    getContractById(id: number): Promise<ResultModel<string> | ResultModel<Contract>>;
}
