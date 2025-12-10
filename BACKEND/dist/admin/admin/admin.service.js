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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
const admin_profile_entity_1 = require("./admin-profile.entity");
const user_entity_1 = require("../user/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const seller_entity_1 = require("../../seller/entities/seller.entity");
const mail_service_1 = require("../../seller/mail/mail.service");
let AdminService = class AdminService {
    adminRepo;
    userRepo;
    profileRepo;
    sellerRepo;
    mailService;
    constructor(adminRepo, userRepo, profileRepo, sellerRepo, mailService) {
        this.adminRepo = adminRepo;
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
        this.sellerRepo = sellerRepo;
        this.mailService = mailService;
    }
    async create(dto) {
        const exists = await this.adminRepo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
        const hashed = await bcrypt.hash(dto.password, 10);
        const admin = this.adminRepo.create({ ...dto, password: hashed });
        const savedAdmin = await this.adminRepo.save(admin);
        const saved = Array.isArray(savedAdmin) ? savedAdmin[0] : savedAdmin;
        const { password, ...rest } = saved;
        return rest;
    }
    async findAll(pagination) {
        try {
            if (!pagination)
                return await this.adminRepo.find({ relations: ['profile', 'users'] });
            const page = pagination.page ?? 1;
            const limit = pagination.limit ?? 10;
            const skip = (page - 1) * limit;
            return await this.adminRepo.find({ skip, take: limit, relations: ['profile', 'users'] });
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new common_1.HttpException('Internal server error: ' + error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const admin = await this.adminRepo.findOne({ where: { id }, relations: ['profile', 'users'] });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        return admin;
    }
    async update(id, dto) {
        const admin = await this.findOne(id);
        if (dto.password)
            dto.password = await bcrypt.hash(dto.password, 10);
        await this.adminRepo.update(id, dto);
        return this.findOne(id);
    }
    async patch(id, partial) {
        const admin = await this.findOne(id);
        if (partial.password)
            partial.password = await bcrypt.hash(partial.password, 10);
        Object.assign(admin, partial);
        const savedAdmin = await this.adminRepo.save(admin);
        const saved = Array.isArray(savedAdmin) ? savedAdmin[0] : savedAdmin;
        return saved;
    }
    async remove(id) {
        await this.findOne(id);
        return this.adminRepo.delete(id);
    }
    searchByName(name) {
        return this.adminRepo
            .createQueryBuilder('admin')
            .where('LOWER(admin.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();
    }
    getActiveAdmins() {
        return this.adminRepo.find({ where: { isActive: true } });
    }
    async assignUser(adminId, userId) {
        const admin = await this.adminRepo.findOne({ where: { id: adminId } });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.admin = admin;
        const savedUser = await this.userRepo.save(user);
        return Array.isArray(savedUser) ? savedUser[0] : savedUser;
    }
    async createProfile(adminId, dto) {
        const admin = await this.adminRepo.findOne({ where: { id: adminId } });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        const existing = await this.profileRepo.findOne({ where: { admin: { id: adminId } } });
        if (existing)
            throw new common_1.HttpException('Profile already exists', common_1.HttpStatus.BAD_REQUEST);
        const profile = this.profileRepo.create({ ...dto, admin });
        const savedProfile = await this.profileRepo.save(profile);
        return Array.isArray(savedProfile) ? savedProfile[0] : savedProfile;
    }
    async getProfile(adminId) {
        return this.profileRepo.findOne({ where: { admin: { id: adminId } }, relations: ['admin'] });
    }
    async updateProfile(adminId, dto) {
        const profile = await this.profileRepo.findOne({ where: { admin: { id: adminId } } });
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        Object.assign(profile, dto);
        const savedProfile = await this.profileRepo.save(profile);
        return Array.isArray(savedProfile) ? savedProfile[0] : savedProfile;
    }
    async sendEmail(email) {
    }
    async getPendingSellers() {
        return this.sellerRepo.find({
            where: { status: seller_entity_1.SellerStatus.PENDING },
            select: ['id', 'fullName', 'email', 'phone', 'shopName', 'createdAt'],
        });
    }
    async approveSeller(id) {
        const seller = await this.sellerRepo.findOne({ where: { id } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        seller.status = seller_entity_1.SellerStatus.APPROVED;
        await this.sellerRepo.save(seller);
        await this.mailService.sendApprovalMail(seller.email, seller.fullName, seller.shopName || 'Your Shop');
        return { message: 'Seller approved & email sent' };
    }
    async rejectSeller(id, reason) {
        const seller = await this.sellerRepo.findOne({ where: { id } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        seller.status = seller_entity_1.SellerStatus.REJECTED;
        seller.rejectedReason = reason || 'No reason provided';
        await this.sellerRepo.save(seller);
        await this.mailService.sendRejectionMail(seller.email, seller.fullName, reason || 'No reason');
        return { message: 'Seller rejected & email sent' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_profile_entity_1.AdminProfile)),
    __param(3, (0, typeorm_1.InjectRepository)(seller_entity_1.Seller)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], AdminService);
//# sourceMappingURL=admin.service.js.map