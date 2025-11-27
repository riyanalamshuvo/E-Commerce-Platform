import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): {
        message: string;
        data: import("./admin.interface").Admin;
    };
    findAll(page?: string, limit?: string): {
        message: string;
        data: import("./admin.interface").Admin[];
    };
    findOne(id: string): {
        message: string;
        data: import("./admin.interface").Admin;
    } | {
        message: string;
        data: null;
    };
    update(id: string, updateAdminDto: UpdateAdminDto): {
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: import("./admin.interface").Admin;
    };
    patch(id: string, partialDto: Partial<UpdateAdminDto>): {
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: import("./admin.interface").Admin;
    };
    remove(id: string): {
        message: string;
    };
    search(name: string): {
        message: string;
        data: import("./admin.interface").Admin[];
    };
    getActiveAdmins(): {
        message: string;
        data: import("./admin.interface").Admin[];
    };
}
