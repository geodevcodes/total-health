import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePharmacyBranchDto {
  @ApiProperty({ example: '3a, Omorinre Johnson Street, Lekki Phase One' })
  @IsString()
  branchAddress: string;

  @ApiPropertyOptional({ example: '08012345678' })
  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Dispensing', 'Compounding'],
  })
  @IsOptional()
  @IsArray()
  servicesOffered?: string[];
}

export class CreatePharmacyBranchesDto {
  @ApiProperty({ type: [CreatePharmacyBranchDto] })
  @IsArray()
  branches: CreatePharmacyBranchDto[];
}
