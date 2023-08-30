import { CreateContractDto } from "../dtos/create-contract.dto";
import { ContractService } from "../services/contract.service";
import { ContractFilterDTO } from "../dtos/filter-contract.dto";
import { UpdateContactDto } from "../dtos/update-contract.dto";
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    create(createContractDto: CreateContractDto): Promise<import("../../../common/result-model").ResultModel<import("../entities/contract.entity").Contract>>;
    filterContracts(filterDto: ContractFilterDTO): Promise<import("../../../common/result-list-model").ResultListModel<import("../entities/contract.entity").Contract>>;
    updateContact(id: any, updateContactDto: UpdateContactDto): Promise<import("../../../common/result-model").ResultModel<string> | import("../../../common/result-model").ResultModel<{
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
    } & import("../entities/contract.entity").Contract>>;
    deactivate(id: any): Promise<import("../../../common/result-model").ResultModel<boolean>>;
}
