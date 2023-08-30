import { UserRole } from '../enums/user-role.enum';
import { UserDto } from '../dto/user.dto';
import { Timeline } from '../../timeline/entities/timeline.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    joinDate: Date;
    isActive: boolean;
    userRole: UserRole;
    timeline: Timeline[];
}
export declare const toUserDto: (data: User) => UserDto;
