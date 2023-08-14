import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserDto } from '../dto/user.dto';
import { IsEmail } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @IsEmail()
  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'date',
    nullable: false,
    default: new Date(),
  })
  joinDate: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean = true;

  @Column({
    type: 'enum',
    nullable: false,
    enum: UserRole,
    default: UserRole.user,
  })
  userRole: UserRole;
}

export const toUserDto = (data: User): UserDto => {
  if(!data) return null;
  const { id, username, email, phone , userRole} = data;
  let userDto: UserDto = { id, username, email, phone, roles: [userRole] };
  return userDto;
};
