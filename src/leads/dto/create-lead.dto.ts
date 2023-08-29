import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty()
  'first_name': string;

  @ApiProperty()
  'last_name': string;

  @ApiProperty({
    required: false,
  })
  'email': string;

  @ApiProperty()
  'phone': string;

  @ApiProperty({
    enum: ['Male', 'Female', 'Non Binary'],
  })
  'gender': string;

  @ApiProperty()
  'address_line1': string;

  @ApiProperty({
    required: false,
  })
  'address_line2': string;

  @ApiProperty({
    required: false,
  })
  'company': string;

  @ApiProperty({
    required: false,
  })
  'designation': string;

  @ApiProperty({
    enum: ['HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST'],
    default: 'MEDIUM',
  })
  'priority': string;

  @ApiProperty({
    required: false,
  })
  'media_id': number;

  @ApiProperty({
    required: false,
  })
  'media_commision': number;

  @ApiProperty({
    required: false,
  })
  'assigned_to': number;

  @ApiProperty()
  'status_id': number;
}
