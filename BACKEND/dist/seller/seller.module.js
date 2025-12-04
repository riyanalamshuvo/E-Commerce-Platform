"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seller_entity_1 = require("./entities/seller.entity");
const seller_service_1 = require("./seller.service");
const seller_auth_module_1 = require("./auth/seller-auth.module");
const seller_controller_1 = require("./seller.controller");
const seller_jwt_guard_1 = require("./guards/seller-jwt.guard");
const active_seller_guard_1 = require("./guards/active-seller.guard");
let SellerModule = class SellerModule {
};
exports.SellerModule = SellerModule;
exports.SellerModule = SellerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([seller_entity_1.Seller]), seller_auth_module_1.SellerAuthModule],
        controllers: [seller_controller_1.SellerController],
        providers: [seller_service_1.SellerService, seller_jwt_guard_1.SellerJwtGuard, active_seller_guard_1.ActiveSellerGuard],
    })
], SellerModule);
//# sourceMappingURL=seller.module.js.map