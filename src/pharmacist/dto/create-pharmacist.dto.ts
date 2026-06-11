import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePharmacistDto {
  @ApiProperty({ example: 'Cameron' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Williamson' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'cameron@cedarwood.com' })
  @IsEmail()
  workEmail: string;

  @ApiPropertyOptional({ example: '08012345678' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'PCN-123456' })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiPropertyOptional({ example: '01424668047' })
  @IsOptional()
  @IsString()
  employeeNumber?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Yoruba', 'English', 'Igbo'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languagesSpoken?: string[];

  @ApiPropertyOptional({ example: 'Experienced pharmacist with 10 years...' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...' })
  @IsOptional()
  @IsString()
  avatar?: string;
}
