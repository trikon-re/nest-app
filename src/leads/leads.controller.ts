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
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  IPaginationQuery,
  LimitQuery,
  PageQuery,
  SearchQuery,
  ShowParanoidQuery,
  SortQuery,
  TrashQuery,
} from 'src/utils/Pagination/dto/query.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Lead')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createLeadDto: CreateLeadDto, @Request() req: any) {
    return this.leadsService.create(createLeadDto, req.user);
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
  @ApiQuery({
    name: 'assigned_to',
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
    @Query('assigned_to') assigned_to?: number,
  ) {
    return this.leadsService.findAll(
      query,
      gender,
      priority,
      status_id,
      assigned_to,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
    @Request() req: any,
  ) {
    return this.leadsService.update(+id, updateLeadDto, req.user);
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiQuery({
    name: 'date',
    type: 'string',
    required: true,
    example: '2023-09-23',
  })
  addFlag(@Param('id') id: string, @Query('date') date: Date) {
    return this.leadsService.addFollowup(+id, date);
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
