import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DrugCategoryDto {
  @ApiProperty({ example: 'Antiretrovirals (ARV)' })
  @IsString()
  name: string;

  @ApiProperty({ type: [String], example: ['Remdesivir', 'Tenofovir'] })
  @IsArray()
  drugs: string[];
}

export class CreateDrugAvailabilityDto {
  @ApiProperty({ type: [DrugCategoryDto] })
  @IsArray()
  categories: DrugCategoryDto[];
}
