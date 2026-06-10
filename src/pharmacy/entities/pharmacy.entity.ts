import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';

export class WorkingScheduleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: DayOfWeek, example: 'MONDAY' })
  day: DayOfWeek;

  @ApiProperty({ example: '9:00 AM' })
  fromTime: string;

  @ApiProperty({ example: '4:00 PM' })
  toTime: string;

  @ApiProperty()
  isActive: boolean;
}

export class PharmacyBranchEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: '3a, Omorinre Johnson Street, Lekki Phase One' })
  branchAddress: string;

  @ApiPropertyOptional({ example: '08012345678' })
  emergencyPhone?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Dispensing', 'Compounding'],
  })
  servicesOffered?: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PharmacyDrugCategoryEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'Antiretrovirals (ARV)' })
  name: string;

  @ApiProperty({ type: [String], example: ['Remdesivir', 'Tenofovir'] })
  drugs: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PharmacyProfileEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ example: '51, Iwaya Road, Onike, Yaba, Lagos' })
  address: string;

  @ApiPropertyOptional({ example: 'RC-123456' })
  cacNumber?: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional()
  pcnLicenseUrl?: string;

  @ApiPropertyOptional()
  businessRegDocUrl?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Hygiea', 'Total health trust'],
  })
  hmoAffiliations?: string[];

  @ApiProperty()
  isSetupComplete: boolean;

  @ApiPropertyOptional({ type: [WorkingScheduleEntity] })
  workingSchedules?: WorkingScheduleEntity[];

  @ApiPropertyOptional({ type: [PharmacyBranchEntity] })
  branches?: PharmacyBranchEntity[];

  @ApiPropertyOptional({ type: [PharmacyDrugCategoryEntity] })
  drugCategories?: PharmacyDrugCategoryEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
