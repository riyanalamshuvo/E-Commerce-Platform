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
exports.ActiveSellerGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seller_entity_1 = require("../entities/seller.entity");
const seller_entity_2 = require("../entities/seller.entity");
let ActiveSellerGuard = class ActiveSellerGuard {
    sellerRepo;
    constructor(sellerRepo) {
        this.sellerRepo = sellerRepo;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const sellerId = request.user.sellerId;
        const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
        if (!seller || seller.status !== seller_entity_2.SellerStatus.APPROVED) {
            throw new common_1.ForbiddenException('Your shop is not approved yet. Please wait for admin approval.');
        }
        return true;
    }
};
exports.ActiveSellerGuard = ActiveSellerGuard;
exports.ActiveSellerGuard = ActiveSellerGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seller_entity_1.Seller)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActiveSellerGuard);
//# sourceMappingURL=active-seller.guard.js.map