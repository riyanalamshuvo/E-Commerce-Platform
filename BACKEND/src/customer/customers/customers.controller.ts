import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersService } from './customers.service';
import { NameValidationPipe } from '../common/pipes/name-validation.pipe';
import { PasswordValidationPipe } from '../common/pipes/password-validation.pipe';
import { PhoneValidationPipe } from '../common/pipes/phone-validation.pipe';
import { PdfFileValidationPipe } from '../common/pipes/pdf-file-validation.pipe';
import { extname } from 'path';

// optionally set destination and filename if storing file
const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = `${Date.now()}${extname(file.originalname)}`;
    cb(null, name);
  },
});

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // Create customer - accepts multipart/form-data with optional file 'document'
  @Post()
  @UseInterceptors(FileInterceptor('document', { storage }))
  async create(
    @Body('fullName', new NameValidationPipe()) fullName: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password', new PasswordValidationPipe()) password: string,
    @Body('phone', new PhoneValidationPipe()) phone: string,
    @UploadedFile(new PdfFileValidationPipe()) document?: Express.Multer.File, // validates PDF
  ) {
    // Build DTO object
    const dto: CreateCustomerDto = { username, fullName, email, password, phone };
    // call service (service remains same, but must accept password/phone fields)
    const data = await this.customersService.create(dto);
    // attach document info if needed
    return { success: true, data, document: document ? { filename: document.filename } : null };
  }

  // ... other routes unchanged
}
