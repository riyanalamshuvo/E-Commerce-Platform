import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepo: Repository<Seller>,
  ) {}

  async updateShop(sellerId: string, dto: UpdateShopDto) {
    const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
    if (!seller) throw new Error('Seller not found');

    Object.assign(seller, dto);
    return this.sellerRepo.save(seller);
  }
}