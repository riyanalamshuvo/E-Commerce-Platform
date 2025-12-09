import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: RegisterDto): Promise<User> {
    // check unique username/email
    const exists = await this.repo.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });
    if (exists) {
      throw new ConflictException('Username or email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    // IMPORTANT: do NOT cast to any[], just let TypeORM infer correctly
    const user = this.repo.create({
      ...dto,
      password: hashed,
    });

    return this.repo.save(user); // returns Promise<User>
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    const u = await this.repo.findOne({ where: { id } });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :u OR user.email = :u', { u: usernameOrEmail })
      .getOne();
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }

  async addRole(userId: number, role: any): Promise<User> {
    const user = await this.findOne(userId);
    if (!user.roles) user.roles = [];
    user.roles.push(role);
    return this.repo.save(user);
  }

  async createOrder(
    userId: number,
    productName: string,
    quantity: number,
  ): Promise<any> {
    const user = await this.findOne(userId);
    const orderRepo = this.repo.manager.getRepository('orders');
    const order = orderRepo.create({ productName, quantity, user });
    return orderRepo.save(order);
  }
}