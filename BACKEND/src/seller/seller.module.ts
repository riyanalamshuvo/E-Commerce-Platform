// src/seller/seller.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { SellerAuthModule } from './auth/seller-auth.module';
import { SellerController } from './seller.controller';
import { SellerJwtGuard } from './guards/seller-jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), SellerAuthModule],
  controllers: [SellerController],
  providers: [SellerJwtGuard],
})
export class SellerModule {}