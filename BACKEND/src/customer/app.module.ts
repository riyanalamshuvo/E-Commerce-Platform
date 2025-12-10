import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CustomersModule } from './customers/customers.module';

import { User } from './user/entities/users.entity';
import { Profile } from './user/entities/profile.entity';
import { Order } from './user/entities/order.entity';
import { Role } from './user/entities/role.entity';
import { Customer } from './customers/entities/customer.entity';

@Module({
  imports: [
    // global .env config
    ConfigModule.forRoot({ isGlobal: true }),

    // DB connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '654321',
      database: 'ecom_db',
      entities: [User, Profile, Order, Role, Customer],
      synchronize: true,
      logging: true,
    }),

    UsersModule,
    AuthModule,
    MailModule,
    CustomersModule,
  ],
})
export class AppModule {}