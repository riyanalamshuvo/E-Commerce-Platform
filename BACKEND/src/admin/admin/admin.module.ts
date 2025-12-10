import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { User } from '../user/user.entity';
import { AdminProfile } from './admin-profile.entity';

import { AuthModule } from '../auth/auth.module';

import { Seller } from '../../seller/entities/seller.entity';   // ← যোগ করো
import { MailService } from '../../seller/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, AdminProfile, Seller]), AuthModule],
  controllers: [AdminController],
  providers: [AdminService, MailService],
})
export class AdminModule {}
