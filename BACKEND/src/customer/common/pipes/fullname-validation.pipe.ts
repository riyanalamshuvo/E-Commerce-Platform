import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FullNameValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') throw new BadRequestException('fullName must be a string');
    if (value.length === 0 || value.length > 100) {
      throw new BadRequestException('fullName must be between 1 and 100 characters');
    }
    const ok = /^[A-Za-z0-9\s]+$/.test(value);
    if (!ok) throw new BadRequestException('fullName must not contain special characters');
    return value;
  }
}
