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
exports.SellerAuthController = void 0;
const common_1 = require("@nestjs/common");
const seller_auth_service_1 = require("./seller-auth.service");
const seller_register_dto_1 = require("./dto/seller-register.dto");
const seller_login_dto_1 = require("./dto/seller-login.dto");
let SellerAuthController = class SellerAuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(dto) {
        return this.authService.register(dto);
    }
    login(dto) {
        return this.authService.login(dto);
    }
};
exports.SellerAuthController = SellerAuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seller_register_dto_1.SellerRegisterDto]),
    __metadata("design:returntype", void 0)
], SellerAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seller_login_dto_1.SellerLoginDto]),
    __metadata("design:returntype", void 0)
], SellerAuthController.prototype, "login", null);
exports.SellerAuthController = SellerAuthController = __decorate([
    (0, common_1.Controller)('seller/auth'),
    __metadata("design:paramtypes", [seller_auth_service_1.SellerAuthService])
], SellerAuthController);
//# sourceMappingURL=seller-auth.controller.js.map