import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get('dashboard')
  getDashboard() {
    return this.reportService.getDashboard();
  }
}
