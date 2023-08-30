import { User } from "../../users/entities/user.entity";
import { Contract } from '../../contract/entities/contract.entity';
import { ContractStatus } from '../../contract_status/entities/contract_status.entity';
export declare class Timeline {
    id: number;
    contractStatus: ContractStatus;
    contract: Contract;
    user: User;
    time: string;
}
