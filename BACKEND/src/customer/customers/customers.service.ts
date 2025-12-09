import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  // Create a new customer
  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer: Customer = this.repo.create(dto); // explicitly typed
    return await this.repo.save(customer);
  }

  // Get all customers with optional search & pagination
  async findAll(query: QueryCustomerDto): Promise<{ data: Customer[]; meta: any }> {
    const { search, page = 1, limit = 10 } = query;

    const where = search
      ? [
          { fullName: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
          { username: ILike(`%${search}%`) },
        ]
      : undefined;

    const [items, total] = await this.repo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit || 1) },
    };
  }

  // Find a single customer by username
  async findByUsername(username: string): Promise<Customer> {
    const customer: Customer | null = await this.repo.findOne({ where: { username } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  // Replace/update a customer completely
  async updateByUsername(username: string, dto: UpdateCustomerDto): Promise<Customer> {
    const customer: Customer = await this.findByUsername(username);
    Object.assign(customer, dto);
    return await this.repo.save(customer);
  }

  // Partial update (PATCH)
  async partialPatch(username: string, dto: Partial<UpdateCustomerDto>): Promise<Customer> {
    const customer: Customer = await this.findByUsername(username);
    Object.assign(customer, dto);
    return await this.repo.save(customer);
  }

  // Change customer status (activate/deactivate)
  async changeStatus(username: string, isActive: boolean): Promise<Customer> {
    const customer: Customer = await this.findByUsername(username);
    customer.isActive = isActive;
    return await this.repo.save(customer);
  }

  // Delete a customer
  async removeByUsername(username: string): Promise<{ id: string; username: string }> {
    const customer: Customer = await this.findByUsername(username);
    await this.repo.remove(customer);
    return { id: customer.id, username: customer.username };
  }
}
