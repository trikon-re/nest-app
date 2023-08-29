import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty({
    required: false,
  })
  first_name: string;

  @ApiProperty({
    required: false,
  })
  last_name: string;

  // @ApiProperty()
  // username: string;

  @ApiProperty({
    enum: ['Male', 'Female', 'Non Binary'],
  })
  gender?: string;

  @ApiProperty({
    required: false,
  })
  role_id: number;

  @ApiProperty({
    required: false,
  })
  display_picture: string;

  @ApiProperty({
    required: false,
  })
  email: string;

  @ApiProperty({
    format: 'date',
    required: false,
  })
  dob: Date;

  @ApiProperty({
    default: 2,
    required: false,
  })
  max_session: number;

  @ApiProperty({
    format: 'date',
    required: false,
  })
  hired_date: Date;

  @ApiProperty({
    default: 8,
    required: false,
  })
  work_hour: number;

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
  address: string;

  @ApiProperty({
    required: false,
  })
  address2: string;

  @ApiProperty({
    required: false,
  })
  cv: string;
}
