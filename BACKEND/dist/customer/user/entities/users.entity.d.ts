import { Profile } from './profile.entity';
import { Order } from './order.entity';
import { Role } from './role.entity';
export type UserStatus = 'active' | 'inactive';
export declare class User {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password: string;
    age?: number;
    status: UserStatus;
    profile: Profile;
    orders: Order[];
    roles: Role[];
}
