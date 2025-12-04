import { Controller, Get, Request, UseGuards, Patch, Body } from '@nestjs/common';
import { SellerJwtGuard } from './guards/seller-jwt.guard';
import { ActiveSellerGuard } from './guards/active-seller.guard';
import { SellerService } from './seller.service';
import { UpdateShopDto } from './dto/update-shop.dto';
@Controller('seller')
@UseGuards(SellerJwtGuard)
export class SellerController {

  constructor(private sellerService: SellerService) { }

  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'Welcome Seller!', user: req.user };
  }

  // ← নতুন রুট – Shop Setup
  @Patch('shop')
  @UseGuards(ActiveSellerGuard)  // শুধু APPROVED সেলার করতে পারবে
  async updateShop(@Request() req, @Body() dto: UpdateShopDto) {
    return this.sellerService.updateShop(req.user.sellerId, dto);
  }
}