"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let PasswordValidationPipe = class PasswordValidationPipe {
    transform(value) {
        if (typeof value !== 'string')
            throw new common_1.BadRequestException('Password must be a string');
        if (value.length < 6)
            throw new common_1.BadRequestException('Password must be at least 6 characters');
        if (!/[a-z]/.test(value))
            throw new common_1.BadRequestException('Password must contain at least one lowercase letter');
        return value;
    }
};
exports.PasswordValidationPipe = PasswordValidationPipe;
exports.PasswordValidationPipe = PasswordValidationPipe = __decorate([
    (0, common_1.Injectable)()
], PasswordValidationPipe);
//# sourceMappingURL=password-validation.pipe.js.map