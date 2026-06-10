import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';

export class WorkingScheduleDto {
  @ApiProperty({ enum: DayOfWeek, example: 'MONDAY' })
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiProperty({ example: '9:00 AM' })
  @IsString()
  fromTime: string;

  @ApiProperty({ example: '4:00 PM' })
  @IsString()
  toTime: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class CreatePharmacyProfileDto {
  @ApiProperty({ example: '51, Iwaya Road, Onike, Yaba, Lagos' })
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cacNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hmoAffiliations?: string[];

  @ApiPropertyOptional({ type: [WorkingScheduleDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkingScheduleDto)
  workingSchedules?: WorkingScheduleDto[];
}
