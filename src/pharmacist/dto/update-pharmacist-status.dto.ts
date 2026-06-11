import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PharmacistStatus } from '@prisma/client';

export class UpdatePharmacistStatusDto {
  @ApiProperty({ enum: PharmacistStatus, example: 'DISABLED' })
  @IsEnum(PharmacistStatus)
  status: PharmacistStatus;
}
