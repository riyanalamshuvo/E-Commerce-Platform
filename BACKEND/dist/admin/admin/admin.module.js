"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./admin.entity");
const user_entity_1 = require("../user/user.entity");
const admin_profile_entity_1 = require("./admin-profile.entity");
const auth_module_1 = require("../auth/auth.module");
const seller_entity_1 = require("../../seller/entities/seller.entity");
const mail_service_1 = require("../../seller/mail/mail.service");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, user_entity_1.User, admin_profile_entity_1.AdminProfile, seller_entity_1.Seller]), auth_module_1.AuthModule],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, mail_service_1.MailService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map