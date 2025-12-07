import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async register(body: { name: string; email: string; password: string; age?: number; role?: string }) {
    const exists = await this.userRepo.findOne({ where: { email: body.email } });
    if (exists) throw new BadRequestException('Email already in use');

    const hashed = await bcrypt.hash(body.password, 10);
    const user = this.userRepo.create({ 
      fullName: body.name, 
      email: body.email, 
      password: hashed, 
      age: body.age ?? 25,  // default age if not provided
      role: body.role ?? 'user' 
    } as any);
    await this.userRepo.save(user);

    const { password, ...rest } = user as any;
    return rest;
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
