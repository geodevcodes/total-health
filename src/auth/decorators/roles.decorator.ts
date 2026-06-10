import { SetMetadata } from '@nestjs/common';
import { UserAccountType } from '../../users/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserAccountType[]) => SetMetadata(ROLES_KEY, roles);
