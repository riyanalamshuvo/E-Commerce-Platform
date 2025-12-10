"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let PhoneValidationPipe = class PhoneValidationPipe {
    transform(value) {
        if (typeof value !== 'string')
            throw new common_1.BadRequestException('Phone must be a string');
        if (!/^01\d{9}$/.test(value))
            throw new common_1.BadRequestException('Phone number must start with 01 and be 11 digits');
        return value;
    }
};
exports.PhoneValidationPipe = PhoneValidationPipe;
exports.PhoneValidationPipe = PhoneValidationPipe = __decorate([
    (0, common_1.Injectable)()
], PhoneValidationPipe);
//# sourceMappingURL=phone-validation.pipe.js.map