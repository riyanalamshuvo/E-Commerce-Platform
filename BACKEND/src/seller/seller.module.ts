import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product.entity';

import { SellerService } from './seller.service';
import { SellerAuthModule } from './auth/seller-auth.module';
import { SellerController } from './seller.controller';
import { SellerJwtGuard } from './guards/seller-jwt.guard';
import {ActiveSellerGuard} from './guards/active-seller.guard'
import { Wallet } from './entities/wallet.entity';
import { MailService } from './mail/mail.service';



@Module({
  imports: [TypeOrmModule.forFeature([Seller, Product, Wallet]), SellerAuthModule],
  controllers: [SellerController],
  providers: [SellerService, SellerJwtGuard, MailService, ActiveSellerGuard], 
  })
export class SellerModule {}