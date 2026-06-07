import { ApiProperty } from '@nestjs/swagger';

class AuthUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ type: AuthUser })
  user: AuthUser;
}

export class MessageEntity {
  @ApiProperty()
  message: string;
}

export class ApiResponse<T> {
  @ApiProperty()
  status: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data: T;
}

export class RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    practiceName: string;
  };
}
