import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  prefix: string;

  @ApiProperty()
  description: string;
}
