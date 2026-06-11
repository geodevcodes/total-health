import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InviteItemDto {
  @ApiProperty({ example: 'peter@cedarwood.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '01424668047' })
  @IsOptional()
  @IsString()
  employeeNumber?: string;
}

export class InvitePharmacistDto {
  @ApiProperty({ type: [InviteItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InviteItemDto)
  invites: InviteItemDto[];
}
