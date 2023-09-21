import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeadLogService } from './lead_log.service';
import { CreateLeadLogDto } from './dto/create-lead_log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lead')
@Controller('lead-log')
export class LeadLogController {
  constructor(private readonly leadLogService: LeadLogService) {}

  @Post()
  create(@Body() createLeadLogDto: CreateLeadLogDto) {
    return this.leadLogService.create(createLeadLogDto);
  }

  @Get()
  findAll() {
    return this.leadLogService.findAll();
  }
}
