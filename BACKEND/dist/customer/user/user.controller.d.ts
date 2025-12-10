import { UsersService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
export declare class UsersController {
    private usersService;
    private mail;
    constructor(usersService: UsersService, mail: MailService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        data: import("./entities/users.entity").User;
    }>;
    findAll(): Promise<{
        success: boolean;
        data: import("./entities/users.entity").User[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        data: import("./entities/users.entity").User;
    }>;
    update(id: number, body: Partial<RegisterDto>): Promise<{
        success: boolean;
        data: import("./entities/users.entity").User;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        deleted: boolean;
    }>;
    createProfile(id: number, body: {
        bio?: string;
        address?: string;
    }): Promise<{
        success: boolean;
        data: import("./entities/users.entity").User;
    }>;
    createOrder(id: number, body: {
        productName: string;
        quantity: number;
    }): Promise<{
        success: boolean;
        data: any;
    }>;
    addRole(id: number, body: {
        roleName: string;
    }): Promise<{
        success: boolean;
        data: import("./entities/users.entity").User;
    }>;
}
