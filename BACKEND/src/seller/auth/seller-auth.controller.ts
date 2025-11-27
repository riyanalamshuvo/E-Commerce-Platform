import { Controller, Post, Body } from '@nestjs/common';
import { SellerAuthService } from './seller-auth.service';
import { SellerRegisterDto } from './dto/seller-register.dto';
import { SellerLoginDto } from './dto/seller-login.dto';

@Controller('seller/auth')
export class SellerAuthController {
  constructor(private authService: SellerAuthService) {}

  @Post('register')
  register(@Body() dto: SellerRegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: SellerLoginDto) {
    return this.authService.login(dto);
  }
}