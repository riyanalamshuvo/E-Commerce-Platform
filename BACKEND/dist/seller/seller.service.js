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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seller_entity_1 = require("./entities/seller.entity");
const product_entity_1 = require("./entities/product.entity");
const wallet_entity_1 = require("./entities/wallet.entity");
const mail_service_1 = require("./mail/mail.service");
let SellerService = class SellerService {
    sellerRepo;
    productRepo;
    walletRepo;
    mailService;
    constructor(sellerRepo, productRepo, walletRepo, mailService) {
        this.sellerRepo = sellerRepo;
        this.productRepo = productRepo;
        this.walletRepo = walletRepo;
        this.mailService = mailService;
    }
    async updateShop(sellerId, dto) {
        const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        Object.assign(seller, dto);
        return this.sellerRepo.save(seller);
    }
    async createProduct(sellerId, dto) {
        const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        const product = this.productRepo.create({ ...dto, seller, sellerId });
        return this.productRepo.save(product);
    }
    async getMyProducts(sellerId) {
        return this.productRepo.find({ where: { sellerId }, order: { createdAt: 'DESC' } });
    }
    async updateProduct(sellerId, productId, dto) {
        const product = await this.productRepo.findOne({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (product.sellerId !== sellerId)
            throw new common_1.ForbiddenException('Not your product');
        Object.assign(product, dto);
        return this.productRepo.save(product);
    }
    async deleteProduct(sellerId, productId) {
        const product = await this.productRepo.findOne({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (product.sellerId !== sellerId)
            throw new common_1.ForbiddenException('Not your product');
        await this.productRepo.remove(product);
        return { message: 'Product deleted successfully' };
    }
    async getWallet(sellerId) {
        let wallet = await this.walletRepo.findOne({ where: { sellerId } });
        if (!wallet) {
            wallet = this.walletRepo.create({ sellerId, balance: 0 });
            return this.walletRepo.save(wallet);
        }
        return wallet;
    }
    async approveSeller(sellerId) {
        const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        seller.status = seller_entity_1.SellerStatus.APPROVED;
        await this.sellerRepo.save(seller);
        await this.mailService.sendApprovalMail(seller.email, seller.fullName, seller.shopName || 'Your Shop');
        return { message: 'Seller approved & email sent' };
    }
    async rejectSeller(sellerId, reason) {
        const seller = await this.sellerRepo.findOne({ where: { id: sellerId } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        seller.status = seller_entity_1.SellerStatus.REJECTED;
        seller.rejectedReason = reason;
        await this.sellerRepo.save(seller);
        await this.mailService.sendRejectionMail(seller.email, seller.fullName, reason);
        return { message: 'Seller rejected & email sent' };
    }
    async getPendingSellers() {
        return this.sellerRepo.find({
            where: { status: seller_entity_1.SellerStatus.PENDING },
            select: ['id', 'fullName', 'email', 'phone', 'shopName', 'createdAt'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seller_entity_1.Seller)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], SellerService);
//# sourceMappingURL=seller.service.js.map