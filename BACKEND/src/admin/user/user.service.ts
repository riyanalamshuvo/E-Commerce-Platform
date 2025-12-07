  // ...existing code...

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  findAllByAdmin(adminId: number) {
    return this.userRepo.find({ where: { admin: { id: adminId } }, relations: ['admin'] });
  }

  async create(dto: CreateUserDto) {
    const ex = await this.userRepo.findOne({ where: { email: dto.email } });
    if (ex) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed } as any);
    const saved = await this.userRepo.save(user);
    const { password, ...rest } = saved as any;
    return rest;
  }

  findAll() {
    return this.userRepo.find({ relations: ['admin'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['admin'] });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user as any;
    return rest;
  }

  async updateUser(id: number, dto: Partial<CreateUserDto>) {
    await this.findOne(id);
    if ((dto as any).password) (dto as any).password = await bcrypt.hash((dto as any).password, 10);
    await this.userRepo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.userRepo.delete(id);
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    await this.findOne(id);
    await this.userRepo.update(id, { status: dto.status });
    return this.findOne(id);
  }

  changeStatus(id: number, dto: UpdateStatusDto) {
    return this.updateStatus(id, dto);
  }

  findInactive() {
    return this.userRepo.find({ where: { status: 'inactive' } });
  }

  findOlderThan40() {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.age > :age', { age: 40 })
      .getMany();
  }
}
