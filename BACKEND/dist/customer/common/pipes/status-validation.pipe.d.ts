import { PipeTransform } from '@nestjs/common';
export declare class StatusValidationPipe implements PipeTransform {
    private allowed;
    transform(value: any): any;
}
