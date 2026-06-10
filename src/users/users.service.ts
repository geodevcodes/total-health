import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import {
  successMessageResponse,
  successResponse,
} from '../common/response.helper';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private validateObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        practiceName: true,
        isEmailVerified: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return successResponse('Users retrieved successfully', users);
  }

  async getUserById(id: string) {
    this.validateObjectId(id);

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        practiceName: true,
        isEmailVerified: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUserByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(id: string, data: UpdateUserDto) {
    this.validateObjectId(id);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          email: true,
          practiceName: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return successResponse('User updated successfully', updatedUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }

  async getUserByIdWithRefreshToken(id: string) {
    this.validateObjectId(id);

    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        refreshToken: true,
        role: true,
      },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async deleteUser(id: string) {
    this.validateObjectId(id);

    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return successMessageResponse('User deleted successfully');
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
