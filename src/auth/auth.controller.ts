import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthEntity, MessageEntity, ApiResponse } from './entities/auth.entity';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterResponse } from './entities/auth.entity';
import { Public } from './decorators/public.decorator';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // This route is public (no auth required)
  @Throttle({ default: { limit: 5, ttl: 60 } }) // 5 attempts per minute
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() dto: LoginDto): Promise<ApiResponse<AuthEntity>> {
    const result = await this.authService.login(dto.email, dto.password);
    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: RegisterResponse })
  async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<ApiResponse<RegisterResponse>> {
    const user = await this.authService.createUser(dto);
    return {
      status: 'success',
      statusCode: HttpStatus.CREATED,
      data: user,
    };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ type: AuthEntity })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get currently authenticated user' })
  @ApiOkResponse({ type: UserEntity })
  getMe(@Request() req): Promise<UserEntity> {
    return this.authService.getCurrentUser(req.user.userId);
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 300 } }) // 3 attempts per 5minute
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset link' })
  @ApiOkResponse({ type: MessageEntity })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiOkResponse({ type: MessageEntity })
  async resetPassword(
    @Param('token') token: string,
    @Body() dto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, dto.newPassword);
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 300 } }) // 3 attempts per 5minute
  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend verification OTP/email' })
  @ApiOkResponse({ type: MessageEntity })
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendVerificationOtp(dto.email);
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60 } }) // 10 attempts per minute
  @Post('verify-email')
  @ApiOperation({ summary: 'Verify user email with token' })
  @ApiOkResponse({ type: MessageEntity })
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Post('logout')
  @UseGuards(PassportJwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout user' })
  logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }
}
