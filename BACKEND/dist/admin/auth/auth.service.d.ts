import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
export declare class AuthService {
    private jwtService;
    private userRepo;
    constructor(jwtService: JwtService, userRepo: Repository<User>);
    register(body: {
        name: string;
        email: string;
        password: string;
        age?: number;
        role?: string;
    }): Promise<any>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
