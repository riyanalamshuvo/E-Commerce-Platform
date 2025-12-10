export declare class CreateUserDto {
    fullName: string;
    age: number;
    status?: 'active' | 'inactive';
    email: string;
    password: string;
    role?: 'user' | 'admin' | 'seller';
}
