"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const customers_module_1 = require("./customers/customers.module");
const users_entity_1 = require("./user/entities/users.entity");
const profile_entity_1 = require("./user/entities/profile.entity");
const order_entity_1 = require("./user/entities/order.entity");
const role_entity_1 = require("./user/entities/role.entity");
const customer_entity_1 = require("./customers/entities/customer.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '654321',
                database: 'ecom_db',
                entities: [users_entity_1.User, profile_entity_1.Profile, order_entity_1.Order, role_entity_1.Role, customer_entity_1.Customer],
                synchronize: true,
                logging: true,
            }),
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            customers_module_1.CustomersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map