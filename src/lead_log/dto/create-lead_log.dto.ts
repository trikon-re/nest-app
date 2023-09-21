import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadLogDto {
  @ApiProperty({
    required: true,
    enum: ['note', 'conversation'],
  })
  'type': string;

  @ApiProperty({
    required: true,
  })
  'lead_id': number;

  @ApiProperty({
    required: false,
  })
  'note': string;

  @ApiProperty({
    required: true,
  })
  'conversation': string;
}
