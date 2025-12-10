import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') throw new BadRequestException('Password must be a string');
    if (value.length < 6) throw new BadRequestException('Password must be at least 6 characters');
    if (!/[a-z]/.test(value)) throw new BadRequestException('Password must contain at least one lowercase letter');
    return value;
  }
}
