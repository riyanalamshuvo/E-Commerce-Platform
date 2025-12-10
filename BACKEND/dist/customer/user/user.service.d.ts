import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(dto: RegisterDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;
    update(id: number, dto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    addRole(userId: number, role: any): Promise<User>;
    createOrder(userId: number, productName: string, quantity: number): Promise<any>;
}
