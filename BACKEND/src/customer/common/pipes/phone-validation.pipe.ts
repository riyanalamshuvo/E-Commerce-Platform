import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhoneValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') throw new BadRequestException('Phone must be a string');
    if (!/^01\d{9}$/.test(value)) throw new BadRequestException('Phone number must start with 01 and be 11 digits');
    return value;
  }
}
