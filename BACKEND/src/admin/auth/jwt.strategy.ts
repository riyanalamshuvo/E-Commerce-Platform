import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cfg: ConfigService) {
    const secret = cfg.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET environment variable not set');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret, // ✅ guaranteed to be a string
    });
  }

  async validate(payload: any) {
    // payload: { sub: userId, email, role }
    return payload;
  }
}
