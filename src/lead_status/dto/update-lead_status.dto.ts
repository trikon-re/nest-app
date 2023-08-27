import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLeadStatusDto } from './create-lead_status.dto';

export class UpdateLeadStatusDto extends PartialType(CreateLeadStatusDto) {
  @ApiProperty()
  label: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  color: string;

  @ApiProperty({
    enum: ['RAW', 'DONE', 'JUNK'],
  })
  type?: string;

  // @ApiProperty({
  //   type: 'array',
  //   items: {
  //     type: 'number',
  //   },
  // })
  // from_status?: number[];

  @ApiProperty()
  from_status?: number;
}
