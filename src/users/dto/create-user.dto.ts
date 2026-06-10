import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserAccountType } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'joedoe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  practiceName: string;

  @ApiProperty({
    example: '+2348133442798',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @Matches(/^\+?[1-9]\d{7,14}$/, {
    message: 'Invalid phone number format',
  })
  phoneNumber: string;

  @IsOptional()
  @IsEnum(UserAccountType)
  @ApiPropertyOptional({
    enum: UserAccountType,
    default: UserAccountType.HOSPITAL,
  })
  role?: UserAccountType;

  @ApiProperty({
    example: 'PasswordTest@12',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
