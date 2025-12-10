import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';
import { AdminJwtGuard } from '../guards/admin-jwt.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.adminService.findAll({ page: Number(page), limit: Number(limit) });
  }

  // Static routes first
  @Get('search/by-name')
  search(@Query('name') name: string) {
    return this.adminService.searchByName(name);
  }

  @Get('active')
  getActiveAdmins() {
    return this.adminService.getActiveAdmins();
  }

  // Relations
  @Patch(':adminId/assign-user/:userId')
  assignUser(@Param('adminId', ParseIntPipe) adminId: number, @Param('userId', ParseIntPipe) userId: number) {
    return this.adminService.assignUser(adminId, userId);
  }


  @Post(':adminId/profile')
  createProfile(@Param('adminId', ParseIntPipe) adminId: number, @Body() dto: any) {
    return this.adminService.createProfile(adminId, dto);
  }

  @Patch(':adminId/profile')
  updateProfile(@Param('adminId', ParseIntPipe) adminId: number, @Body() dto: any) {
    return this.adminService.updateProfile(adminId, dto);
  }

  @Get(':adminId/profile')
  getProfile(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.adminService.getProfile(adminId);
  }

  // Mailer route
  @Post('send-email')
  sendMail(@Body('email') email: string) {
    // mailer route removed
  }

  // Protected example (requires JWT)
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected() {
    return 'You are logged in!';
  }

  // Param routes at bottom
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() partialDto: Partial<UpdateAdminDto>) {
    return this.adminService.patch(id, partialDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }

//ymn

@Get('sellers/pending')
  getPendingSellers() {
    return this.adminService.getPendingSellers();
  }

  // ২. Approve
  @Patch('sellers/:id/approve')
  approveSeller(@Param('id') id: string) {
    return this.adminService.approveSeller(id);
  }

  // ৩. Reject
  @Patch('sellers/:id/reject')
  rejectSeller(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.adminService.rejectSeller(id, reason);
  }


}
