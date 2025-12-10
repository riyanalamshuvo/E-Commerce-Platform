import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<any>;
    findAll(page?: string, limit?: string): Promise<import("./admin.entity").Admin[]>;
    search(name: string): Promise<import("./admin.entity").Admin[]>;
    getActiveAdmins(): Promise<import("./admin.entity").Admin[]>;
    assignUser(adminId: number, userId: number): Promise<any>;
    createProfile(adminId: number, dto: any): Promise<import("./admin-profile.entity").AdminProfile>;
    updateProfile(adminId: number, dto: any): Promise<any>;
    getProfile(adminId: number): Promise<import("./admin-profile.entity").AdminProfile | null>;
    sendMail(email: string): void;
    getProtected(): string;
    findOne(id: number): Promise<import("./admin.entity").Admin>;
    update(id: number, updateAdminDto: UpdateAdminDto): Promise<import("./admin.entity").Admin>;
    patch(id: number, partialDto: Partial<UpdateAdminDto>): Promise<import("./admin.entity").Admin>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getPendingSellers(): Promise<import("../../seller/entities/seller.entity").Seller[]>;
    approveSeller(id: string): Promise<{
        message: string;
    }>;
    rejectSeller(id: string, reason?: string): Promise<{
        message: string;
    }>;
}
