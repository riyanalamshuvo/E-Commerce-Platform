import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Seller } from '../entities/seller.entity';
export declare class ActiveSellerGuard implements CanActivate {
    private sellerRepo;
    constructor(sellerRepo: Repository<Seller>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
