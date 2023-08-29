import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLeadDto } from './create-lead.dto';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {
  @ApiProperty()
  'first_name': string;

  @ApiProperty()
  'last_name': string;

  @ApiProperty()
  'email': string;

  @ApiProperty()
  'phone': string;

  @ApiProperty({
    enum: ['Male', 'Female', 'Non Binary'],
  })
  'gender': string;

  @ApiProperty()
  'address_line1': string;

  @ApiProperty()
  'address_line2': string;

  @ApiProperty()
  'company': string;

  @ApiProperty()
  'designation': string;

  @ApiProperty({
    enum: ['HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST'],
    default: 'MEDIUM',
  })
  'priority': string;

  @ApiProperty()
  'media_id': number;

  @ApiProperty()
  'media_commision': number;
}
