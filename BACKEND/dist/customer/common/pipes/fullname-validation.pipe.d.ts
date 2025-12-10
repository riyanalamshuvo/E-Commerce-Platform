import { PipeTransform } from '@nestjs/common';
export declare class FullNameValidationPipe implements PipeTransform {
    transform(value: any): string;
}
