import {IsEmail, IsString, MinLength, IsMobilePhone, isMobilePhone } from 'class-validator';

export class SellerRegisterDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsMobilePhone('bn-BD')
    phone: String;

    @IsString()
    @MinLength(8)
    password: string;

    

}