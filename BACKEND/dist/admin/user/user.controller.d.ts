import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(dto: CreateUserDto): Promise<any>;
    findInactive(): Promise<import("./user.entity").User[]>;
    findOlderThan40(): Promise<import("./user.entity").User[]>;
    findAll(): Promise<import("./user.entity").User[]>;
    getUserById(id: number): Promise<any>;
    updateUser(id: number, dto: Partial<CreateUserDto>): Promise<any>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    changeStatus(id: number, dto: UpdateStatusDto): Promise<any>;
    getUsersByAdmin(adminId: number): Promise<import("./user.entity").User[]>;
}
