import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SellerAuthController } from './seller-auth.controller';
import { SellerAuthService } from './seller-auth.service';
import { SellerJwtStrategy } from './seller-jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../entities/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller]),
    JwtModule.register({
      secret: process.env.SELLER_JWT_SECRET || 'seller-secret-12345',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SellerAuthController],
  providers: [SellerAuthService, SellerJwtStrategy],
  exports: [SellerAuthService],
})
export class SellerAuthModule {}