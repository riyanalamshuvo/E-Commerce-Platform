import { Controller, Get, Patch, Post, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { SellerJwtGuard } from './guards/seller-jwt.guard';
import { ActiveSellerGuard } from './guards/active-seller.guard';
import { SellerService } from './seller.service';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('seller')

@UseGuards(SellerJwtGuard)
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'Welcome Seller!', user: req.user };
  }

  @Patch('shop')
  @UseGuards(ActiveSellerGuard)
  updateShop(@Request() req, @Body() dto: UpdateShopDto) {
    return this.sellerService.updateShop(req.user.sellerId, dto);
  }

  @Post('products')
  @UseGuards(ActiveSellerGuard)
  createProduct(@Request() req, @Body() dto: CreateProductDto) {
    return this.sellerService.createProduct(req.user.sellerId, dto);
  }

  @Get('products')
  getMyProducts(@Request() req) {
    return this.sellerService.getMyProducts(req.user.sellerId);
  }

  @Patch('products/:id')
  @UseGuards(ActiveSellerGuard)
  updateProduct(@Request() req, @Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.sellerService.updateProduct(req.user.sellerId, id, dto);
  }

  @Delete('products/:id')
  @UseGuards(ActiveSellerGuard)
  deleteProduct(@Request() req, @Param('id') id: string) {
    return this.sellerService.deleteProduct(req.user.sellerId, id);
  }

@Get('wallet')
getWallet(@Request() req) {
  return this.sellerService.getWallet(req.user.sellerId);
}

//mailer

@Get('pending')
async getPendingSellers() {
  return this.sellerService.getPendingSellers();
}

@Patch('approve/:id')
async approveSeller(@Param('id') id: string) {
  return this.sellerService.approveSeller(id);
}

@Patch('reject/:id')
async rejectSeller(@Param('id') id: string, @Body('reason') reason?: string) {
  return this.sellerService.rejectSeller(id, reason || 'No reason provided');
}

}