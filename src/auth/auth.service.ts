import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { TokenType } from './constants';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export interface ITokenPayload {
  accessToken: string;
  expiresIn: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  public async login(loginDto: LoginDto): Promise<LoginPayloadDto> {
    const user = await this.validate(loginDto.username, loginDto.password);
    const tokenPayload = await this.createAccessToken(user);
    const { accessToken, expiresIn } = tokenPayload;
    return new LoginPayloadDto(user.id, user.username, accessToken, expiresIn);
  }

  public async register(registerDto: RegisterDto): Promise<User> {
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRound);
    const userDto = new CreateUserDto(registerDto.username, passwordHash);
    return this.userService.create(userDto);
  }

  public async createAccessToken(user: User): Promise<ITokenPayload> {
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      type: TokenType.ACCESS_TOKEN,
    });
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken,
    };
  }

  public async validate(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    const errorMessage = 'Wrong username or password';
    if (!user) {
      throw new UnauthorizedException(errorMessage);
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException(errorMessage);
    }
    return user;
  }
}
