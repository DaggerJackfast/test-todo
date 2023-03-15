import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { AuthUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { LoginDto } from './dto/login.dto';
import { MePayloadDto } from './dto/me-payload.dto';
import { MessageDto } from './dto/message.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiExtraModels(LoginPayloadDto)
  @ApiOkResponse({ type: LoginPayloadDto })
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto): Promise<LoginPayloadDto> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiExtraModels(MessageDto)
  @ApiOkResponse({ type: MessageDto })
  @HttpCode(HttpStatus.OK)
  public async register(@Body() registerDto: RegisterDto): Promise<MessageDto> {
    const user = await this.authService.register(registerDto);
    const message = `User with username ${user.username} is successfully registered, Please sign-in.`;
    return new MessageDto(message);
  }

  @ApiBearerAuth()
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @ApiExtraModels(MePayloadDto)
  @ApiOkResponse({ type: MePayloadDto })
  @UseGuards(AuthGuard('jwt'))
  public async getMe(@AuthUser() user: User): Promise<MePayloadDto> {
    return new MePayloadDto(user.id, user.username);
  }
}
