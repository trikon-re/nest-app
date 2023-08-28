import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';

@Injectable()
export class LeadsService {
  async create(createLeadDto: CreateLeadDto) {
    return 'This action adds a new lead';
  }

  async findAll(query: IPaginationQuery) {
    return `This action returns all leads`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }

  async remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
