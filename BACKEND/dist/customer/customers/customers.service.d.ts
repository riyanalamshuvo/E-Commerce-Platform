import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
export declare class CustomersService {
    private readonly repo;
    constructor(repo: Repository<Customer>);
    create(dto: CreateCustomerDto): Promise<Customer>;
    findAll(query: QueryCustomerDto): Promise<{
        data: Customer[];
        meta: any;
    }>;
    findByUsername(username: string): Promise<Customer>;
    updateByUsername(username: string, dto: UpdateCustomerDto): Promise<Customer>;
    partialPatch(username: string, dto: Partial<UpdateCustomerDto>): Promise<Customer>;
    changeStatus(username: string, isActive: boolean): Promise<Customer>;
    removeByUsername(username: string): Promise<{
        id: string;
        username: string;
    }>;
}
