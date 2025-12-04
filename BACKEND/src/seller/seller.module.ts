import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';

import { SellerService } from './seller.service';
import { SellerAuthModule } from './auth/seller-auth.module';
import { SellerController } from './seller.controller';
import { SellerJwtGuard } from './guards/seller-jwt.guard';
import {ActiveSellerGuard} from './guards/active-seller.guard'
@Module({
  imports: [TypeOrmModule.forFeature([Seller]), SellerAuthModule],
  controllers: [SellerController],
  providers: [SellerService, SellerJwtGuard, ActiveSellerGuard],  // ← ActiveSellerGuard যোগ করো
})
export class SellerModule {}