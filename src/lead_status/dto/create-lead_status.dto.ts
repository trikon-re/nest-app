import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadStatusDto {
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
