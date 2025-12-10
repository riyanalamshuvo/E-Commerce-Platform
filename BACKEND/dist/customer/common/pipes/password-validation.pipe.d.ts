import { PipeTransform } from '@nestjs/common';
export declare class PasswordValidationPipe implements PipeTransform {
    transform(value: any): string;
}
