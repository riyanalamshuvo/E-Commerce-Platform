import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(usernameOrEmail: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
