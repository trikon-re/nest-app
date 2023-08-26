import { ApiProperty } from '@nestjs/swagger';

export class CreateAwDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
