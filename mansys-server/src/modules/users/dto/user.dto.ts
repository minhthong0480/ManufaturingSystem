import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() username: string;
  @IsNotEmpty() email: string;
  phone: string;
  @IsNotEmpty()
  roles: string[];
  name : string;
}
