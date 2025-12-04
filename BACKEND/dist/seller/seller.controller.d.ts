import { SellerService } from './seller.service';
import { UpdateShopDto } from './dto/update-shop.dto';
export declare class SellerController {
    private sellerService;
    constructor(sellerService: SellerService);
    getProfile(req: any): {
        message: string;
        user: any;
    };
    updateShop(req: any, dto: UpdateShopDto): Promise<import("./entities/seller.entity").Seller>;
}
