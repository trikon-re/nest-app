import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  // @ApiProperty()
  // username: string;

  @ApiProperty({
    enum: ['Male', 'Female', 'Non Binary'],
  })
  gender?: string;

  @ApiProperty()
  password: string;

  @ApiProperty({
    required: false,
  })
  display_picture: string;

  @ApiProperty({
    required: false,
  })
  tin: string;

  @ApiProperty({
    required: false,
  })
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    format: 'date',
  })
  dob: Date;

  @ApiProperty({
    default: 2,
  })
  max_session: number;

  @ApiProperty({
    format: 'date',
  })
  hired_date: Date;

  @ApiProperty({
    default: 8,
    required: false,
  })
  work_hour: number;

  @ApiProperty()
  role_id: number;

  @ApiProperty({
    required: false,
  })
  salary: number;

  @ApiProperty({
    required: false,
  })
  bank: string;

  @ApiProperty({
    required: false,
  })
  nid_number: string;

  @ApiProperty({
    required: false,
  })
  nid_attachment: string;

  @ApiProperty()
  address: string;

  @ApiProperty({
    required: false,
  })
  address2: string;

  @ApiProperty({
    required: false,
  })
  cv: string;

  //   @ApiProperty()
  //   is_active: boolean;

  //   @ApiProperty()
  //   verified_at: Date;

  //   @ApiProperty()
  //   created_at: Date;

  //   @ApiProperty()
  //   updated_at: Date;

  //   @ApiProperty()
  //   deleted_at: Date;
}
