import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';
import { Seller } from './seller/entities/seller.entity';
import { Product } from './seller/entities/product.entity';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'ecommerce_db',

      entities: [Seller, Product],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),


    AdminModule,
    SellerModule,
  ],
})
export class AppModule { }