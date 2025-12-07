import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from '../admin/admin.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column()
  age: number;

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ unique: true , nullable: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Admin, (admin) => admin.users, { onDelete: 'SET NULL' })
  admin: Admin;

  @Column({ default: 'user' })
  role: string;
}
