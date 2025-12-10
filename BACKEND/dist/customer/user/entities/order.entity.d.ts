import { User } from './users.entity';
export declare class Order {
    id: number;
    productName: string;
    quantity: number;
    createdAt: Date;
    user: User;
}
