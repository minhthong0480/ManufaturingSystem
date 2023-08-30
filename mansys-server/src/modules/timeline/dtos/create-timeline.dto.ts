import { IsNotEmpty, IsString} from 'class-validator';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { ContractStatus } from 'src/modules/contract_status/entities/contract_status.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateTimelineDto{
    
    contractStatusId: number;

    contractId: number;

    userId: number;

    @IsNotEmpty()
    @IsString()
    time: string;


}