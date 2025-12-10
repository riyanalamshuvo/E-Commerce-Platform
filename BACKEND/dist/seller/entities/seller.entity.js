"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = exports.SellerStatus = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const product_entity_1 = require("./product.entity");
const wallet_entity_1 = require("./wallet.entity");
var SellerStatus;
(function (SellerStatus) {
    SellerStatus["PENDING"] = "PENDING";
    SellerStatus["APPROVED"] = "APPROVED";
    SellerStatus["REJECTED"] = "REJECTED";
    SellerStatus["BLOCKED"] = "BLOCKED";
})(SellerStatus || (exports.SellerStatus = SellerStatus = {}));
let Seller = class Seller {
    id;
    email;
    password;
    fullName;
    phone;
    shopName;
    shopSlug;
    status;
    rejectedReason;
    createdAt;
    updatedAt;
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    products;
    wallet;
};
exports.Seller = Seller;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Seller.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Seller.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seller.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seller.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Seller.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "shopName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], Seller.prototype, "shopSlug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SellerStatus, default: SellerStatus.PENDING }),
    __metadata("design:type", String)
], Seller.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "rejectedReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Seller.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Seller.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Seller.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.seller),
    __metadata("design:type", Array)
], Seller.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => wallet_entity_1.Wallet, (wallet) => wallet.seller),
    __metadata("design:type", wallet_entity_1.Wallet)
], Seller.prototype, "wallet", void 0);
exports.Seller = Seller = __decorate([
    (0, typeorm_1.Entity)('sellers')
], Seller);
//# sourceMappingURL=seller.entity.js.map