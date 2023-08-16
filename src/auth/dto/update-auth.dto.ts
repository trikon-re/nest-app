import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto {
  @ApiProperty()
  first_name?: string;

  @ApiProperty()
  last_name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  display_picture?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  dob?: Date;

  @ApiProperty()
  bank?: string;

  @ApiProperty()
  address?: string;
}
