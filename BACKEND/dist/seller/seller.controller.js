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
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
let SellerController = class SellerController {
    sellerService;
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    getProfile(req) {
        return { message: 'Welcome Seller!', user: req.user };
    }
    updateShop(req, dto) {
        return this.sellerService.updateShop(req.user.sellerId, dto);
    }
    createProduct(req, dto) {
        return this.sellerService.createProduct(req.user.sellerId, dto);
    }
    getMyProducts(req) {
        return this.sellerService.getMyProducts(req.user.sellerId);
    }
    updateProduct(req, id, dto) {
        return this.sellerService.updateProduct(req.user.sellerId, id, dto);
    }
    deleteProduct(req, id) {
        return this.sellerService.deleteProduct(req.user.sellerId, id);
    }
    getWallet(req) {
        return this.sellerService.getWallet(req.user.sellerId);
    }
    async getPendingSellers() {
        return this.sellerService.getPendingSellers();
    }
    async approveSeller(id) {
        return this.sellerService.approveSeller(id);
    }
    async rejectSeller(id, reason) {
        return this.sellerService.rejectSeller(id, reason || 'No reason provided');
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
    __metadata("design:returntype", void 0)
], SellerController.prototype, "updateShop", null);
__decorate([
    (0, common_1.Post)('products'),
    (0, common_1.UseGuards)(active_seller_guard_1.ActiveSellerGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "getMyProducts", null);
__decorate([
    (0, common_1.Patch)('products/:id'),
    (0, common_1.UseGuards)(active_seller_guard_1.ActiveSellerGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('products/:id'),
    (0, common_1.UseGuards)(active_seller_guard_1.ActiveSellerGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('wallet'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)('pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getPendingSellers", null);
__decorate([
    (0, common_1.Patch)('approve/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "approveSeller", null);
__decorate([
    (0, common_1.Patch)('reject/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "rejectSeller", null);
exports.SellerController = SellerController = __decorate([
    (0, common_1.Controller)('seller'),
    (0, common_1.UseGuards)(seller_jwt_guard_1.SellerJwtGuard),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map