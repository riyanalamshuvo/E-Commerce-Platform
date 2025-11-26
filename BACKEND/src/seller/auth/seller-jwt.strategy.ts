import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class SellerJwtStrategy extends PassportStrategy(Strategy, 'seller-jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SELLER_JWT_SECRET || 'seller-secret-12345', 
        });
    }

async validate(payload: any){
    return {sellerId: payload.sub, role: payload.role};
}



}