import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({
    example: 'joedoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  practiceName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
