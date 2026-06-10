import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @ApiProperty({
    example: 'your-google-id-token',
    description: 'Google ID Token',
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;
}

export class LinkedInLoginDto {
  @ApiProperty({
    example: 'your-linkedin-access-token',
    description: 'LinkedIn Access Token',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class FacebookLoginDto {
  @ApiProperty({
    example: 'your-facebook-access-token',
    description: 'Facebook Access Token',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
