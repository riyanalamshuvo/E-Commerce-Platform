import { PipeTransform } from '@nestjs/common';
export declare class NameValidationPipe implements PipeTransform {
    transform(value: any): string;
}
