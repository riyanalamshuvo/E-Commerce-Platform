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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProfile = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
let AdminProfile = class AdminProfile {
    id;
    address;
    phone;
    admin;
};
exports.AdminProfile = AdminProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminProfile.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminProfile.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => admin_entity_1.Admin, (admin) => admin.profile, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", admin_entity_1.Admin)
], AdminProfile.prototype, "admin", void 0);
exports.AdminProfile = AdminProfile = __decorate([
    (0, typeorm_1.Entity)()
], AdminProfile);
//# sourceMappingURL=admin-profile.entity.js.map