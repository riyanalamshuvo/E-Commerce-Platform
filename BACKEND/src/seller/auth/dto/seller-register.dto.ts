import {IsEmail, IsString, MinLength, IsMobilePhone, isMobilePhone } from 'class-validator';

export class SellerRegisterDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsMobilePhone('bn-BD')
    phone: string;

    @IsString()
    @MinLength(8)
    password: string;

    

}