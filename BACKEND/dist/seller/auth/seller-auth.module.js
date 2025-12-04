"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerAuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const seller_auth_controller_1 = require("./seller-auth.controller");
const seller_auth_service_1 = require("./seller-auth.service");
const seller_jwt_strategy_1 = require("./seller-jwt.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const seller_entity_1 = require("../entities/seller.entity");
let SellerAuthModule = class SellerAuthModule {
};
exports.SellerAuthModule = SellerAuthModule;
exports.SellerAuthModule = SellerAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([seller_entity_1.Seller]),
            jwt_1.JwtModule.register({
                secret: process.env.SELLER_JWT_SECRET || 'seller-secret-12345',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [seller_auth_controller_1.SellerAuthController],
        providers: [seller_auth_service_1.SellerAuthService, seller_jwt_strategy_1.SellerJwtStrategy],
        exports: [seller_auth_service_1.SellerAuthService],
    })
], SellerAuthModule);
//# sourceMappingURL=seller-auth.module.js.map