import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MailService } from '../mail/mail.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private mail: MailService) {}

  // 1) register user (POST)
  @Post()
  async register(@Body() dto: RegisterDto) {
    const created = await this.usersService.create(dto);
    // optionally send welcome email
    if (created?.email) {
      await this.mail.sendMail(created.email, 'Welcome', `<p>Welcome ${created.fullName}</p>`).catch(() => {});
    }
    return { success: true, data: created };
  }

  // 2) get all users (GET)
  @Get()
  async findAll() {
    return { success: true, data: await this.usersService.findAll() };
  }

  // 3) get single user by id (GET)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { success: true, data: await this.usersService.findOne(id) };
  }

  // 4) patch user (PATCH)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<RegisterDto>) {
    const updated = await this.usersService.update(id, body as any);
    return { success: true, data: updated };
  }

  // 5) delete user (DELETE)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return { success: true, deleted: true };
  }

  // Relationship routes:

  // 6) Create profile for user (OneToOne)
  @Post(':id/profile')
  async createProfile(@Param('id', ParseIntPipe) id: number, @Body() body: { bio?: string; address?: string }) {
    const user = await this.usersService.findOne(id);
    user.profile = body as any;
    const saved = await this.usersService.update(id, user);
    return { success: true, data: saved };
  }

  // 7) Create Order for user (OneToMany)
  @Post(':id/orders')
  async createOrder(@Param('id', ParseIntPipe) id: number, @Body() body: { productName: string; quantity: number }) {
    const created = await this.usersService.createOrder(id, body.productName, body.quantity);
    return { success: true, data: created };
  }

  // 8) Assign role to user (ManyToMany)
  @Post(':id/roles')
  async addRole(@Param('id', ParseIntPipe) id: number, @Body() body: { roleName: string }) {
    // be simple: create role row if missing
    const roleRepo = (this.usersService as any).repo.manager.getRepository('roles');
    let role = await roleRepo.findOne({ where: { name: body.roleName } });
    if (!role) {
      role = roleRepo.create({ name: body.roleName });
      await roleRepo.save(role);
    }
    const updated = await this.usersService.addRole(id, role);
    return { success: true, data: updated };
  }
}