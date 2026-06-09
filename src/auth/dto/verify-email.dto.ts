import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  token: string;
}
