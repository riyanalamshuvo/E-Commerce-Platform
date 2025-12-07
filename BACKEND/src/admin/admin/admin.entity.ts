import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { AdminProfile } from './admin-profile.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true , nullable: true  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => AdminProfile, (profile) => profile.admin, { cascade: ['insert', 'update'] })
  profile: AdminProfile;

  @OneToMany(() => User, (user) => user.admin)
  users: User[];

  @Column({ nullable: true })
  linkedIn?: string;

  @Column({ nullable: true })
  facebook?: string;

  @Column({ nullable: true })
  twitter?: string;
}
