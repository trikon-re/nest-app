import { Module } from '@nestjs/common';
import { LeadStatusService } from './lead_status.service';
import { LeadStatusController } from './lead_status.controller';

@Module({
  controllers: [LeadStatusController],
  providers: [LeadStatusService],
})
export class LeadStatusModule {}
