import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AgeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null) return value; // optional
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0) throw new BadRequestException('age must be an unsigned integer');
    return n;
  }
}
