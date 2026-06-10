import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegisterResponse } from './entities/auth.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UserAccountType } from '../users/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private prisma: PrismaService,
  ) {}

  // VALIDATE USER CREDENTIALS
  async validateCredentials(email: string, password: string) {
    const user = await this.usersService.getUserByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = user.password;

    if (!user || !hashedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      const existingToken = await this.prisma.verificationToken.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });

      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      if (!existingToken || existingToken.createdAt < fiveMinutesAgo) {
        await this.resendVerificationOtp(user.email);
      }

      throw new UnauthorizedException(
        'Email not verified. A verification code has been sent to your email.',
      );
    }
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  // LOGIN
  async login(email: string, password: string) {
    const user = await this.validateCredentials(email, password);
    return this.generateTokens(user.id, user.email, user.role);
  }

  // GENERATE TOKENS
  async generateTokens(userId: string, email: string, role: UserAccountType) {
    const payload = { sub: userId, email, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // Hash refresh token before saving
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        email,
        role,
      },
    };
  }

  // REFRESH TOKEN
  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const userId = payload.sub;

      const user = await this.usersService.getUserByIdWithRefreshToken(userId);

      if (!user || !user.refreshToken) {
        throw new ForbiddenException('Access denied');
      }

      const tokenMatches = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!tokenMatches) {
        throw new ForbiddenException('Access denied');
      }

      return this.generateTokens(user.id, user.email, user.role);
    } catch {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }

  // CREATE USER (REGISTER)
  async createUser(data: CreateUserDto): Promise<RegisterResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: data.role ?? UserAccountType.HOSPITAL,
      },
      select: {
        id: true,
        email: true,
        practiceName: true,
        role: true,
      },
    });

    // Generate and send verification OTP
    await this.resendVerificationOtp(user.email);

    // generate tokens AFTER user creation
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        practiceName: user.practiceName,
        role: user.role,
      },
    };
  }

  // CURRENT USER
  async getCurrentUser(userId: string) {
    const user = await this.usersService.getUserById(userId);
    return {
      id: user.id,
      email: user.email,
      practiceName: user.practiceName,
      isEmailVerified: user.isEmailVerified,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // FORGOT PASSWORD
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

    // Remove old password reset tokens
    await this.prisma.passwordReset.deleteMany({ where: { userId: user.id } });

    // Create a new token
    await this.prisma.passwordReset.create({
      data: { userId: user.id, token, expiresAt },
    });

    // Send password reset link
    const resetlink = `https://total-healthcaree.vercel.app/reset-password?resetToken=${token}`;
    await this.mailService.sendPasswordResetLink(user.email, resetlink);

    return {
      message: `Password reset link sent to your email: ${user.email}`,
      email,
    };
  }

  // RESET PASSWORD
  async resetPassword(token: string, newPassword: string) {
    const reset = await this.prisma.passwordReset.findFirst({
      where: { token, expiresAt: { gt: new Date() } },
    });

    if (!reset) throw new BadRequestException('Invalid or expired token');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: reset.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordReset.delete({ where: { id: reset.id } });

    return { message: 'Password has been reset successfully' };
  }

  // RESEND VERIFICATION OTP
  async resendVerificationOtp(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    if (user.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Remove old verification tokens
    await this.prisma.verificationToken.deleteMany({
      where: { userId: user.id },
    });

    // Create a new token
    await this.prisma.verificationToken.create({
      data: { userId: user.id, token, expiresAt },
    });

    // Actually send the email now
    await this.mailService.sendSignupOtp(
      email,
      token,
      user.practiceName ?? email,
    );

    return { message: 'Verification OTP sent to your email' };
  }

  // VERIFY EMAIL
  async verifyEmail(token: string) {
    const record = await this.prisma.verificationToken.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
      },
    });

    if (!record) {
      throw new BadRequestException('Invalid or expired token');
    }

    // Check if already verified (extra safety)
    const user = await this.prisma.user.findUnique({
      where: { id: record.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    // Verify email
    await this.prisma.user.update({
      where: { id: record.userId },
      data: { isEmailVerified: true },
    });

    // Delete all verification tokens for this user
    await this.prisma.verificationToken.deleteMany({
      where: { userId: record.userId },
    });

    // Send welcome email after successful verification
    await this.mailService.sendSignupMail(
      user.email,
      user.practiceName ?? user.email,
    );

    return { message: 'Email verified successfully' };
  }

  // LOGOUT
  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
  }
}
