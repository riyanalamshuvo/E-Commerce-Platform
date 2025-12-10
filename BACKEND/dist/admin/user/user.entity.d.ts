import { Admin } from '../admin/admin.entity';
export declare class User {
    id: number;
    fullName: string;
    age: number;
    status: string;
    email: string;
    password: string;
    admin: Admin;
    role: string;
}
