import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type:"date",
    nullable: false,
    default: new Date(),
  })
  joinDate: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
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
