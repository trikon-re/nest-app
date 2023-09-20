import { PartialType } from '@nestjs/swagger';
import { CreateLeadLogDto } from './create-lead_log.dto';

export class UpdateLeadLogDto extends PartialType(CreateLeadLogDto) {}
