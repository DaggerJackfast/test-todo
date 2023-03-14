import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { AuthUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { LoginDto } from './dto/login.dto';
import { MePayloadDto } from './dto/me-payload.dto';
import { RegisterDto } from './dto/register.dto';

interface IMessage {
  message: string;
}
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto): Promise<LoginPayloadDto> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  public async register(@Body() registerDto: RegisterDto): Promise<IMessage> {
    const user = await this.authService.register(registerDto);
    return { message: `User with username ${user.username} is successfully registered, Please sign-in.` };
  }

  @ApiBearerAuth()
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async getMe(@AuthUser() user: User): Promise<MePayloadDto> {
    return new MePayloadDto(user.id, user.username);
  }
}
