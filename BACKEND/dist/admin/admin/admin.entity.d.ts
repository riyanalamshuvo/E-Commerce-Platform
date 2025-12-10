import { User } from '../user/user.entity';
import { AdminProfile } from './admin-profile.entity';
export declare class Admin {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
    profile: AdminProfile;
    users: User[];
    linkedIn?: string;
    facebook?: string;
    twitter?: string;
}
