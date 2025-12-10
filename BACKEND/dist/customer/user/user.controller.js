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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const register_dto_1 = require("./dto/register.dto");
const mail_service_1 = require("../mail/mail.service");
let UsersController = class UsersController {
    usersService;
    mail;
    constructor(usersService, mail) {
        this.usersService = usersService;
        this.mail = mail;
    }
    async register(dto) {
        const created = await this.usersService.create(dto);
        if (created?.email) {
            await this.mail.sendMail(created.email, 'Welcome', `<p>Welcome ${created.fullName}</p>`).catch(() => { });
        }
        return { success: true, data: created };
    }
    async findAll() {
        return { success: true, data: await this.usersService.findAll() };
    }
    async findOne(id) {
        return { success: true, data: await this.usersService.findOne(id) };
    }
    async update(id, body) {
        const updated = await this.usersService.update(id, body);
        return { success: true, data: updated };
    }
    async remove(id) {
        await this.usersService.remove(id);
        return { success: true, deleted: true };
    }
    async createProfile(id, body) {
        const user = await this.usersService.findOne(id);
        user.profile = body;
        const saved = await this.usersService.update(id, user);
        return { success: true, data: saved };
    }
    async createOrder(id, body) {
        const created = await this.usersService.createOrder(id, body.productName, body.quantity);
        return { success: true, data: created };
    }
    async addRole(id, body) {
        const roleRepo = this.usersService.repo.manager.getRepository('roles');
        let role = await roleRepo.findOne({ where: { name: body.roleName } });
        if (!role) {
            role = roleRepo.create({ name: body.roleName });
            await roleRepo.save(role);
        }
        const updated = await this.usersService.addRole(id, role);
        return { success: true, data: updated };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/profile'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Post)(':id/orders'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)(':id/roles'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addRole", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UsersService, mail_service_1.MailService])
], UsersController);
//# sourceMappingURL=user.controller.js.map