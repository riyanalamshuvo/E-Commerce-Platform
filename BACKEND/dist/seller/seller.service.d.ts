import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product.entity';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Wallet } from './entities/wallet.entity';
import { MailService } from './mail/mail.service';
export declare class SellerService {
    private sellerRepo;
    private productRepo;
    private walletRepo;
    private mailService;
    constructor(sellerRepo: Repository<Seller>, productRepo: Repository<Product>, walletRepo: Repository<Wallet>, mailService: MailService);
    updateShop(sellerId: string, dto: UpdateShopDto): Promise<Seller>;
    createProduct(sellerId: string, dto: CreateProductDto): Promise<Product>;
    getMyProducts(sellerId: string): Promise<Product[]>;
    updateProduct(sellerId: string, productId: string, dto: UpdateProductDto): Promise<Product>;
    deleteProduct(sellerId: string, productId: string): Promise<{
        message: string;
    }>;
    getWallet(sellerId: string): Promise<Wallet>;
    approveSeller(sellerId: string): Promise<{
        message: string;
    }>;
    rejectSeller(sellerId: string, reason: string): Promise<{
        message: string;
    }>;
    getPendingSellers(): Promise<Seller[]>;
}
