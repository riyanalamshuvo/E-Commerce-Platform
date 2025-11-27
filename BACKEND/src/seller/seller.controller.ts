
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { SellerJwtGuard } from './guards/seller-jwt.guard';

@Controller('seller')
@UseGuards(SellerJwtGuard)
export class SellerController {
  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'Seller authenticated', user: req.user };
  }
}