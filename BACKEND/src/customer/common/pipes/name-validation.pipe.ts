import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class NameValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') throw new BadRequestException('Name must be a string');
    const ok = /^[A-Za-z0-9\s]+$/.test(value);
    if (!ok) throw new BadRequestException('Name must not contain special characters');
    return value;
  }
}
