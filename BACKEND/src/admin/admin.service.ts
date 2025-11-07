import { Injectable } from '@nestjs/common';
import { Admin } from './admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  private admins: Admin[] = [];

  // 1️⃣ Create admin
  create(createAdminDto: CreateAdminDto) {
    const newAdmin: Admin = {
      id: this.admins.length + 1,
      ...createAdminDto,
      isActive: createAdminDto.isActive ?? true,
      createdAt: new Date(),
    };
    this.admins.push(newAdmin);
    return { message: 'Admin created successfully', data: newAdmin };
  }

  // 2️⃣ Get all admins
  findAll({ page, limit }: { page: number; limit: number }) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = this.admins.slice(start, end);
    return { message: 'Admins retrieved successfully', data: paginated };
  }

  // 3️⃣ Get one admin
  findOne(id: number) {
    const admin = this.admins.find(a => a.id === id);
    return admin
      ? { message: 'Admin found successfully', data: admin }
      : { message: 'Admin not found', data: null };
  }

  // 4️⃣ Update admin
  update(id: number, updateAdminDto: UpdateAdminDto) {
    const index = this.admins.findIndex(a => a.id === id);
    if (index === -1) return { message: 'Admin not found' };
    this.admins[index] = { ...this.admins[index], ...updateAdminDto };
    return { message: 'Admin updated successfully', data: this.admins[index] };
  }

  // 5️⃣ Patch admin
  patch(id: number, partialDto: Partial<UpdateAdminDto>) {
    const index = this.admins.findIndex(a => a.id === id);
    if (index === -1) return { message: 'Admin not found' };
    this.admins[index] = { ...this.admins[index], ...partialDto };
    return { message: 'Admin partially updated successfully', data: this.admins[index] };
  }

  // 6️⃣ Delete admin
  remove(id: number) {
    const index = this.admins.findIndex(a => a.id === id);
    if (index === -1) return { message: 'Admin not found' };
    this.admins.splice(index, 1);
    return { message: 'Admin deleted successfully' };
  }

  // 7️⃣ Search by name
  searchByName(name: string) {
    const results = this.admins.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
    return { message: 'Search results', data: results };
  }

  // 8️⃣ Get only active admins
  getActiveAdmins() {
    const active = this.admins.filter(a => a.isActive);
    return { message: 'Active admins retrieved successfully', data: active };
  }
}
