import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../user/user.service';
import { RegisterDto } from '../user/dto/register.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        data: import("../user/entities/users.entity").User;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
