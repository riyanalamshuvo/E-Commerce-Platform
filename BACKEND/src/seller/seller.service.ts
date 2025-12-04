import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product.entity';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepo: Repository<Seller>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // Shop Update
  async updateShop(sellerId: string, dto: UpdateShopDto) {
    const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
    if (!seller) throw new NotFoundException('Seller not found');
    Object.assign(seller, dto);
    return this.sellerRepo.save(seller);
  }

  // Product CRUD
  async createProduct(sellerId: string, dto: CreateProductDto) {
    const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
    if (!seller) throw new NotFoundException('Seller not found');

    const product = this.productRepo.create({ ...dto, seller, sellerId });
    return this.productRepo.save(product);
  }

  async getMyProducts(sellerId: string) {
    return this.productRepo.find({ where: { sellerId }, order: { createdAt: 'DESC' } });
  }

  async updateProduct(sellerId: string, productId: string, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.sellerId !== sellerId) throw new ForbiddenException('Not your product');

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async deleteProduct(sellerId: string, productId: string) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.sellerId !== sellerId) throw new ForbiddenException('Not your product');

    await this.productRepo.remove(product);
    return { message: 'Product deleted successfully' };
  }
}