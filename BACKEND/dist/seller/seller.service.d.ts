import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { UpdateShopDto } from './dto/update-shop.dto';
export declare class SellerService {
    private sellerRepo;
    constructor(sellerRepo: Repository<Seller>);
    updateShop(sellerId: string, dto: UpdateShopDto): Promise<Seller>;
}
