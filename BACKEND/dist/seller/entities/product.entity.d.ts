import { Seller } from './seller.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    seller: Seller;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
}
