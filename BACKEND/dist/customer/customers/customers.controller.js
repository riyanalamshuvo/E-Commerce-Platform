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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const customers_service_1 = require("./customers.service");
const name_validation_pipe_1 = require("../common/pipes/name-validation.pipe");
const password_validation_pipe_1 = require("../common/pipes/password-validation.pipe");
const phone_validation_pipe_1 = require("../common/pipes/phone-validation.pipe");
const pdf_file_validation_pipe_1 = require("../common/pipes/pdf-file-validation.pipe");
const path_1 = require("path");
const storage = (0, multer_1.diskStorage)({
    destination: './uploads',
    filename: (req, file, cb) => {
        const name = `${Date.now()}${(0, path_1.extname)(file.originalname)}`;
        cb(null, name);
    },
});
let CustomersController = class CustomersController {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    async create(fullName, username, email, password, phone, document) {
        const dto = { username, fullName, email, password, phone };
        const data = await this.customersService.create(dto);
        return { success: true, data, document: document ? { filename: document.filename } : null };
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('document', { storage })),
    __param(0, (0, common_1.Body)('fullName', new name_validation_pipe_1.NameValidationPipe())),
    __param(1, (0, common_1.Body)('username')),
    __param(2, (0, common_1.Body)('email')),
    __param(3, (0, common_1.Body)('password', new password_validation_pipe_1.PasswordValidationPipe())),
    __param(4, (0, common_1.Body)('phone', new phone_validation_pipe_1.PhoneValidationPipe())),
    __param(5, (0, common_1.UploadedFile)(new pdf_file_validation_pipe_1.PdfFileValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map