import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
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
  role_id: number;

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
  })
  work_hour: number;

  @ApiProperty()
  salary: number;

  @ApiProperty()
  bank: string;

  @ApiProperty()
  address: string;
}
