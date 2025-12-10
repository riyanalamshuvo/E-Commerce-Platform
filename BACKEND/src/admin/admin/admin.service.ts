// admin/admin.service.ts
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminProfile } from './admin-profile.entity';
import { User } from '../user/user.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Seller, SellerStatus } from '../../seller/entities/seller.entity';
import { MailService } from '../../seller/mail/mail.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AdminProfile) private profileRepo: Repository<AdminProfile>,
    
      // mailer removed
      //ymn
      @InjectRepository(Seller)
    private sellerRepo: Repository<Seller>,
    private mailService: MailService,
  ) {}

  async create(dto: CreateAdminDto) {
    const exists = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    const hashed = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({ ...dto, password: hashed } as any);

    // Fix for TypeScript Admin[] issue
    const savedAdmin = await this.adminRepo.save(admin);
    const saved: Admin = Array.isArray(savedAdmin) ? savedAdmin[0] : savedAdmin;

    // send welcome email
      // mailer code removed

    const { password, ...rest } = saved as any;
    return rest;
  }

  async findAll(pagination?: { page?: number; limit?: number }) {
    try {
      if (!pagination) return await this.adminRepo.find({ relations: ['profile', 'users'] });
      const page = pagination.page ?? 1;
      const limit = pagination.limit ?? 10;
      const skip = (page - 1) * limit;
      return await this.adminRepo.find({ skip, take: limit, relations: ['profile', 'users'] });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new HttpException('Internal server error: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id }, relations: ['profile', 'users'] });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    if ((dto as any).password) (dto as any).password = await bcrypt.hash((dto as any).password, 10);
    await this.adminRepo.update(id, dto as any);
    return this.findOne(id);
  }

  async patch(id: number, partial: Partial<UpdateAdminDto>) {
    const admin = await this.findOne(id);
    if ((partial as any).password) (partial as any).password = await bcrypt.hash((partial as any).password, 10);
    Object.assign(admin, partial);

    // Fix for TypeScript Admin[] issue
    const savedAdmin = await this.adminRepo.save(admin);
    const saved: Admin = Array.isArray(savedAdmin) ? savedAdmin[0] : savedAdmin;

    return saved;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.adminRepo.delete(id);
  }

  searchByName(name: string) {
    return this.adminRepo
      .createQueryBuilder('admin')
      .where('LOWER(admin.name) LIKE LOWER(:name)', { name: `%${name}%` })
      .getMany();
  }

  getActiveAdmins() {
    return this.adminRepo.find({ where: { isActive: true } });
  }

  // Relations
  async assignUser(adminId: number, userId: number) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    (user as any).admin = admin;

    // Fix for TypeScript Admin[] issue
    const savedUser = await this.userRepo.save(user);
    return Array.isArray(savedUser) ? savedUser[0] : savedUser;
  }

  async createProfile(adminId: number, dto: Partial<AdminProfile>) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const existing = await this.profileRepo.findOne({ where: { admin: { id: adminId } } });
    if (existing) throw new HttpException('Profile already exists', HttpStatus.BAD_REQUEST);

    const profile = this.profileRepo.create({ ...dto, admin } as any);

    // Fix for TypeScript AdminProfile[] issue (rare)
    const savedProfile = await this.profileRepo.save(profile);
    return Array.isArray(savedProfile) ? savedProfile[0] : savedProfile;
  }

  async getProfile(adminId: number) {
    return this.profileRepo.findOne({ where: { admin: { id: adminId } }, relations: ['admin'] });
  }

  async updateProfile(adminId: number, dto: Partial<AdminProfile>) {
    const profile = await this.profileRepo.findOne({ where: { admin: { id: adminId } } });
    if (!profile) throw new NotFoundException('Profile not found');
    Object.assign(profile, dto);

    // Fix for TypeScript AdminProfile[] issue
    const savedProfile = await this.profileRepo.save(profile);
    return Array.isArray(savedProfile) ? savedProfile[0] : savedProfile;
  }

  // Mailer wrapper
  async sendEmail(email: string) {
    // mailer code removed
  }


  //ymn
  async getPendingSellers() {
    return this.sellerRepo.find({
      where: { status: SellerStatus.PENDING },
      select: ['id', 'fullName', 'email', 'phone', 'shopName', 'createdAt'],
    });
  }

  async approveSeller(id: string) {
  const seller = await this.sellerRepo.findOne({ where: { id } });
  if (!seller) throw new NotFoundException('Seller not found');

  seller.status = SellerStatus.APPROVED;   // ← এভাবে লিখো
  await this.sellerRepo.save(seller);

  await this.mailService.sendApprovalMail(seller.email, seller.fullName, seller.shopName || 'Your Shop');
  return { message: 'Seller approved & email sent' };
}

async rejectSeller(id: string, reason?: string) {
  const seller = await this.sellerRepo.findOne({ where: { id } });
  if (!seller) throw new NotFoundException('Seller not found');

  seller.status = SellerStatus.REJECTED;   // ← এভাবে লিখো
  seller.rejectedReason = reason || 'No reason provided';
  await this.sellerRepo.save(seller);

  await this.mailService.sendRejectionMail(seller.email, seller.fullName, reason || 'No reason');
  return { message: 'Seller rejected & email sent' };
}
}

