import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { TokenType } from './constants';
export interface IValidateArgs {
  id: string;
  username: string;
  type: TokenType;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  public validate(payload: IValidateArgs): IValidateArgs {
    if (!payload.id || payload.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
