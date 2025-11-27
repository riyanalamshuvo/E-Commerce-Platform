import { Repository } from 'typeorm';
import { Seller } from '../entities/seller.entity';
import { SellerRegisterDto } from './dto/seller-register.dto';
import { SellerLoginDto } from './dto/seller-login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class SellerAuthService {
    private sellerRepo;
    private jwtService;
    constructor(sellerRepo: Repository<Seller>, jwtService: JwtService);
    register(dto: SellerRegisterDto): Promise<{
        access_token: string;
        seller: {
            id: string;
            email: string;
            status: import("../entities/seller.entity").SellerStatus;
        };
    }>;
    login(dto: SellerLoginDto): Promise<{
        access_token: string;
        seller: {
            id: string;
            email: string;
            status: import("../entities/seller.entity").SellerStatus;
        };
    }>;
}
