"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
let AdminService = class AdminService {
    admins = [];
    create(createAdminDto) {
        const newAdmin = {
            id: this.admins.length + 1,
            ...createAdminDto,
            isActive: createAdminDto.isActive ?? true,
            createdAt: new Date(),
        };
        this.admins.push(newAdmin);
        return { message: 'Admin created successfully', data: newAdmin };
    }
    findAll({ page, limit }) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginated = this.admins.slice(start, end);
        return { message: 'Admins retrieved successfully', data: paginated };
    }
    findOne(id) {
        const admin = this.admins.find(a => a.id === id);
        return admin
            ? { message: 'Admin found successfully', data: admin }
            : { message: 'Admin not found', data: null };
    }
    update(id, updateAdminDto) {
        const index = this.admins.findIndex(a => a.id === id);
        if (index === -1)
            return { message: 'Admin not found' };
        this.admins[index] = { ...this.admins[index], ...updateAdminDto };
        return { message: 'Admin updated successfully', data: this.admins[index] };
    }
    patch(id, partialDto) {
        const index = this.admins.findIndex(a => a.id === id);
        if (index === -1)
            return { message: 'Admin not found' };
        this.admins[index] = { ...this.admins[index], ...partialDto };
        return { message: 'Admin partially updated successfully', data: this.admins[index] };
    }
    remove(id) {
        const index = this.admins.findIndex(a => a.id === id);
        if (index === -1)
            return { message: 'Admin not found' };
        this.admins.splice(index, 1);
        return { message: 'Admin deleted successfully' };
    }
    searchByName(name) {
        const results = this.admins.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
        return { message: 'Search results', data: results };
    }
    getActiveAdmins() {
        const active = this.admins.filter(a => a.isActive);
        return { message: 'Active admins retrieved successfully', data: active };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map