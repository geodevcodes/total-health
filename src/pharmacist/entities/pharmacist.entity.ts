import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PharmacistStatus, InviteStatus } from '@prisma/client';

export class PharmacistEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  pharmacyId: string;

  @ApiProperty({ example: 'Cameron' })
  firstName: string;

  @ApiProperty({ example: 'Williamson' })
  lastName: string;

  @ApiPropertyOptional({ example: 'cameron@cedarwood.com' })
  workEmail?: string;

  @ApiPropertyOptional({ example: '08012345678' })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'PCN-123456' })
  licenseNumber?: string;

  @ApiPropertyOptional({ example: '01424668047' })
  employeeNumber?: string;

  @ApiPropertyOptional({ type: [String] })
  languagesSpoken?: string[];

  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiProperty({ enum: PharmacistStatus })
  status: PharmacistStatus;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PharmacistInviteEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  employeeNumber?: string;

  @ApiProperty({ enum: InviteStatus })
  status: InviteStatus;

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  createdAt: Date;
}
