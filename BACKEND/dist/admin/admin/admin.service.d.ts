import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminProfile } from './admin-profile.entity';
import { User } from '../user/user.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Seller } from '../../seller/entities/seller.entity';
import { MailService } from '../../seller/mail/mail.service';
export declare class AdminService {
    private adminRepo;
    private userRepo;
    private profileRepo;
    private sellerRepo;
    private mailService;
    constructor(adminRepo: Repository<Admin>, userRepo: Repository<User>, profileRepo: Repository<AdminProfile>, sellerRepo: Repository<Seller>, mailService: MailService);
    create(dto: CreateAdminDto): Promise<any>;
    findAll(pagination?: {
        page?: number;
        limit?: number;
    }): Promise<Admin[]>;
    findOne(id: number): Promise<Admin>;
    update(id: number, dto: UpdateAdminDto): Promise<Admin>;
    patch(id: number, partial: Partial<UpdateAdminDto>): Promise<Admin>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    searchByName(name: string): Promise<Admin[]>;
    getActiveAdmins(): Promise<Admin[]>;
    assignUser(adminId: number, userId: number): Promise<any>;
    createProfile(adminId: number, dto: Partial<AdminProfile>): Promise<AdminProfile>;
    getProfile(adminId: number): Promise<AdminProfile | null>;
    updateProfile(adminId: number, dto: Partial<AdminProfile>): Promise<any>;
    sendEmail(email: string): Promise<void>;
    getPendingSellers(): Promise<Seller[]>;
    approveSeller(id: string): Promise<{
        message: string;
    }>;
    rejectSeller(id: string, reason?: string): Promise<{
        message: string;
    }>;
}
