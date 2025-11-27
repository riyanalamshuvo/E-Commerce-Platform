import { SellerAuthService } from './seller-auth.service';
import { SellerRegisterDto } from './dto/seller-register.dto';
import { SellerLoginDto } from './dto/seller-login.dto';
export declare class SellerAuthController {
    private authService;
    constructor(authService: SellerAuthService);
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
