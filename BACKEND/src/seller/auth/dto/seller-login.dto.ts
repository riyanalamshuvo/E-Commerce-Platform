// src/seller/auth/dto/seller-login.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class SellerLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}