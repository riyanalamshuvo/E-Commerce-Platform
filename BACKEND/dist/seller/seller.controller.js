"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const seller_jwt_guard_1 = require("./guards/seller-jwt.guard");
const active_seller_guard_1 = require("./guards/active-seller.guard");
const seller_service_1 = require("./seller.service");
const update_shop_dto_1 = require("./dto/update-shop.dto");
let SellerController = class SellerController {
    sellerService;
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    getProfile(req) {
        return { message: 'Welcome Seller!', user: req.user };
    }
    async updateShop(req, dto) {
        return this.sellerService.updateShop(req.user.sellerId, dto);
    }
};
exports.SellerController = SellerController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('shop'),
    (0, common_1.UseGuards)(active_seller_guard_1.ActiveSellerGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_shop_dto_1.UpdateShopDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "updateShop", null);
exports.SellerController = SellerController = __decorate([
    (0, common_1.Controller)('seller'),
    (0, common_1.UseGuards)(seller_jwt_guard_1.SellerJwtGuard),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map