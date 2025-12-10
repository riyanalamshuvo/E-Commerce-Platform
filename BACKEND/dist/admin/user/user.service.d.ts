import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    findAllByAdmin(adminId: number): Promise<User[]>;
    create(dto: CreateUserDto): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<any>;
    updateUser(id: number, dto: Partial<CreateUserDto>): Promise<any>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<any>;
    changeStatus(id: number, dto: UpdateStatusDto): Promise<any>;
    findInactive(): Promise<User[]>;
    findOlderThan40(): Promise<User[]>;
}
