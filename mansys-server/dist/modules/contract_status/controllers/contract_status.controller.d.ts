import { ContractStatusService } from "../services/contract_status.service";
import { CreateContractStatusDto } from "../dtos/create_contract_status.dto";
export declare class ContractStatusController {
    private ContractStatusService;
    constructor(ContractStatusService: ContractStatusService);
    create(CreateContractStatusDto: CreateContractStatusDto): Promise<import("../entities/contract_status.entity").ContractStatus>;
    getAll(name: string): Promise<import("../entities/contract_status.entity").ContractStatus[]>;
    delete(id: number): Promise<import("../entities/contract_status.entity").ContractStatus>;
}
