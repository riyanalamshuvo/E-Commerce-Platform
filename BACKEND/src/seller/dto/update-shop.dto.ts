import { IsString, IsOptional, IsMobilePhone } from 'class-validator';

export class UpdateShopDto {
    @IsString()
    @IsOptional()
    shopName?: string;

    @IsString()
    @IsOptional()
    shopSlug?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsMobilePhone('bn-BD')
    @IsOptional()
    phone?: string;

    // Bank Info
    @IsString()
    @IsOptional()
    bankName?: string;

    @IsString()
    @IsOptional()
    bankAccountName?: string;

    @IsString()
    @IsOptional()
    bankAccountNo?: string;

    // Document
    @IsString()
    @IsOptional()
    nidNumber?: string;
}