import { PipeTransform } from '@nestjs/common';
export declare class PdfFileValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File): Express.Multer.File;
}
