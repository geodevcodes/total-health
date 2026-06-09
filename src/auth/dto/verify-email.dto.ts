import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ example: '447498' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  token: string;
}
