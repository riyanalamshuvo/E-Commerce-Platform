import { Injectable, ConflictException, UnauthorizedException
 } from "@nestjs/common";

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../entities/seller.entity';
import { SellerRegisterDto } from './dto/seller-register.dto';
import { SellerLoginDto } from './dto/seller-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SellerAuthService{
    constructor(@InjectRepository(Seller)
private sellerRepo: Repository<Seller>,
private jwtService: JwtService) {}

async register(dto: SellerRegisterDto) {
    const exists = await this.sellerRepo.findOne({
      where: [{ email: dto.email }, { phone: dto.phone }],
    });
    if (exists) throw new ConflictException('Email or phone already exists');

    const seller = this.sellerRepo.create(dto);
    const saved = await this.sellerRepo.save(seller);

    const payload = { sub: saved.id, role: 'SELLER' };
    return {
      access_token: this.jwtService.sign(payload),
      seller: { id: saved.id, email: saved.email, status: saved.status },
    };
  }

  async login(dto: SellerLoginDto) {
    const seller = await this.sellerRepo.findOne({ where: { email: dto.email } });
    if (!seller || !(await bcrypt.compare(dto.password, seller.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: seller.id, role: 'SELLER' };
    return {
      access_token: this.jwtService.sign(payload),
      seller: { id: seller.id, email: seller.email, status: seller.status },
    };
  }

}