import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../entities/seller.entity';
import { SellerStatus } from '../entities/seller.entity';

@Injectable()
export class ActiveSellerGuard implements CanActivate {
  constructor(
    @InjectRepository(Seller)
    private sellerRepo: Repository<Seller>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sellerId = request.user.sellerId;

    const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });

    if (!seller || seller.status !== SellerStatus.APPROVED) {
      throw new ForbiddenException('Your shop is not approved yet. Please wait for admin approval.');
    }

    return true;
  }
}