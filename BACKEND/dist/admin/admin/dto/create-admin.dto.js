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
exports.CreateAdminDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAdminDto {
    name;
    email;
    password;
    isActive;
    createdAt;
    linkedIn;
    facebook;
    twitter;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name should not be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\s]+$/, { message: 'Name should not contain numbers' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email should not be empty' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password should not be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[@#$&]/, { message: 'Password must contain at least one special character (@, #, $, &)' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'createdAt must be a valid ISO date string' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'invalid URL' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "linkedIn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'invalid URL' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "facebook", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'invalid URL' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "twitter", void 0);
//# sourceMappingURL=create-admin.dto.js.map