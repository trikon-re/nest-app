import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
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
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @ApiQuery({
    name: 'priority',
    type: 'string',
    enum: ['HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST'],
    required: false,
  })
  @ApiQuery({
    name: 'gender',
    type: 'string',
    enum: ['Male', 'Female', 'Non Binary'],
    required: false,
  })
  @ApiQuery({
    name: 'status_id',
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
    @Query('gender') gender?: string,
    @Query('priority') priority?: string,
    @Query('status_id') status_id?: number,
  ) {
    return this.leadsService.findAll(query, gender, priority, status_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  @ApiQuery({
    name: 'permanent',
    type: 'boolean',
    required: false,
  })
  @ApiQuery({
    name: 'restore',
    type: 'boolean',
    required: false,
  })
  remove(
    @Param('id') id: string,
    @Query('permanent') permanent?: boolean,
    @Query('restore') restore?: boolean,
  ) {
    return this.leadsService.remove(+id, permanent, restore);
  }

  @Get(':id/interested-properties')
  interested(@Param('id') id: string) {
    return this.leadsService.findIterestedProperties(+id);
  }

  @Post(':id/interested-properties')
  @ApiQuery({
    name: 'property_id',
    type: 'number',
    required: true,
  })
  add_interested(
    @Param('id') id: string,
    @Query('property_id') property_id: number,
  ) {
    return this.leadsService.addIterestedProperties(+id, property_id);
  }

  @Delete(':association_id/interested-properties')
  delete_interested(@Param('association_id') id: string) {
    return this.leadsService.removeIterestedProperties(+id);
  }
}
