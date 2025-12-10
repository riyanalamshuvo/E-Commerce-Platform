import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './users.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  address?: string;

  @OneToOne(() => User, (user: User) => user.profile)
  user: User;
}
