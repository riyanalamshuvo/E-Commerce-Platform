"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullNameValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let FullNameValidationPipe = class FullNameValidationPipe {
    transform(value) {
        if (typeof value !== 'string')
            throw new common_1.BadRequestException('fullName must be a string');
        if (value.length === 0 || value.length > 100) {
            throw new common_1.BadRequestException('fullName must be between 1 and 100 characters');
        }
        const ok = /^[A-Za-z0-9\s]+$/.test(value);
        if (!ok)
            throw new common_1.BadRequestException('fullName must not contain special characters');
        return value;
    }
};
exports.FullNameValidationPipe = FullNameValidationPipe;
exports.FullNameValidationPipe = FullNameValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FullNameValidationPipe);
//# sourceMappingURL=fullname-validation.pipe.js.map