import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty({
    enum: ['Male', 'Female', 'Non Binary'],
  })
  gender?: string;

  @ApiProperty()
  display_picture: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    format: 'date',
  })
  dob: Date;

  @ApiProperty()
  address_line1: string;

  @ApiProperty()
  address_line2: string;
}
