import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product.entity';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class SellerService {
    private sellerRepo;
    private productRepo;
    constructor(sellerRepo: Repository<Seller>, productRepo: Repository<Product>);
    updateShop(sellerId: string, dto: UpdateShopDto): Promise<Seller>;
    createProduct(sellerId: string, dto: CreateProductDto): Promise<Product>;
    getMyProducts(sellerId: string): Promise<Product[]>;
    updateProduct(sellerId: string, productId: string, dto: UpdateProductDto): Promise<Product>;
    deleteProduct(sellerId: string, productId: string): Promise<{
        message: string;
    }>;
}
