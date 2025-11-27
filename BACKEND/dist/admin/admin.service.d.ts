import { Admin } from './admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private admins;
    create(createAdminDto: CreateAdminDto): {
        message: string;
        data: Admin;
    };
    findAll({ page, limit }: {
        page: number;
        limit: number;
    }): {
        message: string;
        data: Admin[];
    };
    findOne(id: number): {
        message: string;
        data: Admin;
    } | {
        message: string;
        data: null;
    };
    update(id: number, updateAdminDto: UpdateAdminDto): {
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: Admin;
    };
    patch(id: number, partialDto: Partial<UpdateAdminDto>): {
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: Admin;
    };
    remove(id: number): {
        message: string;
    };
    searchByName(name: string): {
        message: string;
        data: Admin[];
    };
    getActiveAdmins(): {
        message: string;
        data: Admin[];
    };
}
