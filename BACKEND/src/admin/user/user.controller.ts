
import { Controller, Post, Body, Patch, Param, Get, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('inactive')
  findInactive() {
    return this.userService.findInactive();
  }

  @Get('older-than-40')
  findOlderThan40() {
    return this.userService.findOlderThan40();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateUserDto>) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Patch(':id/status')
  changeStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatusDto) {
    return this.userService.changeStatus(id, dto);
  }

  @Get('by-admin/:adminId')
  getUsersByAdmin(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.userService.findAllByAdmin(adminId);
  }
}
