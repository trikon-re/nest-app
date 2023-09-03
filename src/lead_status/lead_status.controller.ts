import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { LeadStatusService } from './lead_status.service';
import { CreateLeadStatusDto } from './dto/create-lead_status.dto';
import { UpdateLeadStatusDto } from './dto/update-lead_status.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  IPaginationQuery,
  LimitQuery,
  PageQuery,
  SearchQuery,
  ShowParanoidQuery,
  SortQuery,
  TrashQuery,
} from 'src/utils/Pagination/dto/query.dto';

@ApiTags('Lead')
@Controller('lead-status')
export class LeadStatusController {
  constructor(private readonly leadStatusService: LeadStatusService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createLeadStatusDto: CreateLeadStatusDto) {
    return this.leadStatusService.create(createLeadStatusDto);
  }

  @Get()
  // Filter Queries
  @ApiQuery({
    name: 'type',
    type: 'string',
    enum: ['RAW', 'DONE', 'JUNK'],
    required: false,
  })
  // Pagination Queries
  @ApiQuery(TrashQuery)
  @ApiQuery(ShowParanoidQuery)
  @ApiQuery(SortQuery)
  @ApiQuery(PageQuery)
  @ApiQuery(LimitQuery)
  @ApiQuery(SearchQuery)
  findAll(@Query() query: IPaginationQuery, @Query('type') type?: string) {
    return this.leadStatusService.findAll(query, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadStatusService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadStatusDto: UpdateLeadStatusDto,
  ) {
    return this.leadStatusService.update(+id, updateLeadStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadStatusService.remove(+id);
  }
}
