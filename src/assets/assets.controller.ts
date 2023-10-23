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
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
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

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
  }

  @Get()
  @ApiQuery({
    name: 'type',
    type: 'string',
    enum: ['FLAT', 'LAND'],
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: 'string',
    enum: ['Latest', 'In Progress', 'Booked', 'Sold', 'Cancelled'],
    required: false,
  })
  @ApiQuery({
    name: 'area',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'using_type',
    type: 'string',
    enum: ['used', 'new'],
    required: false,
  })
  @ApiQuery({
    name: 'size_unit',
    type: 'string',
    enum: ['SQFT', 'KATHA', 'BIGHA', 'ACRES', 'SHOTOK', 'DECIMAL'],
    required: false,
  })
  @ApiQuery({
    name: 'max_size',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'min_size',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'max_budget',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'min_budget',
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
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('area') area?: string,
    @Query('using_type') using_type?: string,
    @Query('size_unit') size_unit?: string,
    @Query('max_size') max_size?: number,
    @Query('min_size') min_size?: number,
    @Query('max_budget') max_budget?: number,
    @Query('min_budget') min_budget?: number,
  ) {
    return this.assetsService.findAll(
      query,
      type,
      status,
      area,
      using_type,
      size_unit,
      +max_budget,
      +max_size,
      +min_budget,
      +min_size,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(+id, updateAssetDto);
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
    return this.assetsService.remove(+id, permanent, restore);
  }

  @Get(':id/interested-buyers')
  interested(@Param('id') id: string) {
    return this.assetsService.findInterestedLeads(+id);
  }
}
