"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfFileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let PdfFileValidationPipe = class PdfFileValidationPipe {
    transform(file) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        if (file.mimetype !== 'application/pdf') {
            throw new common_1.BadRequestException('Uploaded file must be a PDF');
        }
        if (!file.originalname.toLowerCase().endsWith('.pdf')) {
            throw new common_1.BadRequestException('Uploaded file must have a .pdf extension');
        }
        return file;
    }
};
exports.PdfFileValidationPipe = PdfFileValidationPipe;
exports.PdfFileValidationPipe = PdfFileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], PdfFileValidationPipe);
//# sourceMappingURL=pdf-file-validation.pipe.js.map