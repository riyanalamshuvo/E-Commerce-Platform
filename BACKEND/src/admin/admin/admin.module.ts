import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { User } from '../user/user.entity';
import { AdminProfile } from './admin-profile.entity';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, AdminProfile]), AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
