import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty({
    enum: ['Male', 'Female', 'Non Binary'],
    default: 'Non Binary',
    required: false,
  })
  gender?: string;

  @ApiProperty({
    required: false,
  })
  display_picture: string;

  @ApiProperty({
    required: false,
  })
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    format: 'date',
    required: true,
  })
  dob: Date;

  @ApiProperty()
  address_line1: string;

  @ApiProperty({
    required: false,
  })
  address_line2: string;
}
