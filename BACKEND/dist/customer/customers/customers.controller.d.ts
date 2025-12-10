import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(fullName: string, username: string, email: string, password: string, phone: string, document?: Express.Multer.File): Promise<{
        success: boolean;
        data: import("./entities/customer.entity").Customer;
        document: {
            filename: string;
        } | null;
    }>;
}
