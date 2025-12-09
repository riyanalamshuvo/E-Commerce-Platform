import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class StatusValidationPipe implements PipeTransform {
  private allowed = ['active', 'inactive'];
  transform(value: any) {
    if (value === undefined || value === null) return value; // optional
    if (typeof value !== 'string') throw new BadRequestException('status must be a string');
    if (!this.allowed.includes(value)) {
      throw new BadRequestException(`status must be one of: ${this.allowed.join(', ')}`);
    }
    return value as 'active' | 'inactive';
  }
}
