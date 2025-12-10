import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import type { Express } from 'express';

@Injectable()
export class PdfFileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is required');
    // MIME type check
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Uploaded file must be a PDF');
    }
    // Optionally check extension:
    if (!file.originalname.toLowerCase().endsWith('.pdf')) {
      throw new BadRequestException('Uploaded file must have a .pdf extension');
    }
    return file;
  }
}
