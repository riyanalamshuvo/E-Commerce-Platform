import { PipeTransform } from '@nestjs/common';
export declare class PhoneValidationPipe implements PipeTransform {
    transform(value: any): string;
}
