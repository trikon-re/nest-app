import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { LeadLogService } from './lead_log.service';
import { CreateLeadLogDto } from './dto/create-lead_log.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
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
@Controller('lead-log')
export class LeadLogController {
  constructor(private readonly leadLogService: LeadLogService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLeadLogDto: CreateLeadLogDto, @Request() req: any) {
    return this.leadLogService.create(createLeadLogDto);
  }

  @Get()
  @ApiQuery({
    name: 'lead_id',
    type: 'number',
    required: false,
  })
  // Pagination Queries
  @ApiQuery(TrashQuery)
  @ApiQuery(ShowParanoidQuery)
  @ApiQuery(SortQuery)
  @ApiQuery(PageQuery)
  @ApiQuery(LimitQuery)
  @ApiQuery(SearchQuery)
  findAll(
    @Query() query: IPaginationQuery,
    @Query('lead_id') lead_id?: number,
  ) {
    return this.leadLogService.findAll(query, lead_id);
  }
}
