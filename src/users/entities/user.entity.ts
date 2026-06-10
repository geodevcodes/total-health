import { ApiProperty } from '@nestjs/swagger';
import { UserAccountType } from '@prisma/client';

export { UserAccountType };
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

  @ApiProperty({ example: 'HOSPITAL', enum: UserAccountType })
  role: UserAccountType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
