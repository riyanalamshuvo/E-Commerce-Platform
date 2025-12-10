import { Product } from './product.entity';
import { Wallet } from './wallet.entity';
export declare enum SellerStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED"
}
export declare class Seller {
    id: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    shopName?: string;
    shopSlug?: string;
    status: SellerStatus;
    rejectedReason?: string;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    products: Product[];
    wallet: Wallet;
}
