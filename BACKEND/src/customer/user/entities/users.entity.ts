import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Profile } from './profile.entity';
import { Order } from './order.entity';
import { Role } from './role.entity';

export type UserStatus = 'active' | 'inactive';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100, unique: true, nullable: true })
  username: string;

  @Column({ length: 200, unique: true, nullable: true })
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: UserStatus;

  // One-to-One: User -> Profile
  @OneToOne(() => Profile, (p: Profile) => p.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  profile: Profile;

  // One-to-Many: User -> Orders
  @OneToMany(() => Order, (order: Order) => order.user, {
    cascade: true,
  })
  orders: Order[];

  // Many-to-Many: User <-> Role
  @ManyToMany(() => Role, (role: Role) => role.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}