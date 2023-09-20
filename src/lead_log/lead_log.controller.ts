import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeadLogService } from './lead_log.service';
import { CreateLeadLogDto } from './dto/create-lead_log.dto';
import { UpdateLeadLogDto } from './dto/update-lead_log.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadLogDto: UpdateLeadLogDto) {
    return this.leadLogService.update(+id, updateLeadLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadLogService.remove(+id);
  }
}
