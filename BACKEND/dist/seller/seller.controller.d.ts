import { SellerService } from './seller.service';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class SellerController {
    private sellerService;
    constructor(sellerService: SellerService);
    getProfile(req: any): {
        message: string;
        user: any;
    };
    updateShop(req: any, dto: UpdateShopDto): Promise<import("./entities/seller.entity").Seller>;
    createProduct(req: any, dto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    getMyProducts(req: any): Promise<import("./entities/product.entity").Product[]>;
    updateProduct(req: any, id: string, dto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    deleteProduct(req: any, id: string): Promise<{
        message: string;
    }>;
    getWallet(req: any): Promise<import("./entities/wallet.entity").Wallet>;
    getPendingSellers(): Promise<import("./entities/seller.entity").Seller[]>;
    approveSeller(id: string): Promise<{
        message: string;
    }>;
    rejectSeller(id: string, reason?: string): Promise<{
        message: string;
    }>;
}
