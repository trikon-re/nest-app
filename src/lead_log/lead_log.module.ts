import { Module } from '@nestjs/common';
import { LeadLogService } from './lead_log.service';
import { LeadLogController } from './lead_log.controller';

@Module({
  controllers: [LeadLogController],
  providers: [LeadLogService],
})
export class LeadLogModule {}
