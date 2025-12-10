"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let StatusValidationPipe = class StatusValidationPipe {
    allowed = ['active', 'inactive'];
    transform(value) {
        if (value === undefined || value === null)
            return value;
        if (typeof value !== 'string')
            throw new common_1.BadRequestException('status must be a string');
        if (!this.allowed.includes(value)) {
            throw new common_1.BadRequestException(`status must be one of: ${this.allowed.join(', ')}`);
        }
        return value;
    }
};
exports.StatusValidationPipe = StatusValidationPipe;
exports.StatusValidationPipe = StatusValidationPipe = __decorate([
    (0, common_1.Injectable)()
], StatusValidationPipe);
//# sourceMappingURL=status-validation.pipe.js.map