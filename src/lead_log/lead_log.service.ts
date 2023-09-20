import { Injectable } from '@nestjs/common';
import { CreateLeadLogDto } from './dto/create-lead_log.dto';
import { UpdateLeadLogDto } from './dto/update-lead_log.dto';

@Injectable()
export class LeadLogService {
  create(createLeadLogDto: CreateLeadLogDto) {
    return 'This action adds a new leadLog';
  }

  findAll() {
    return `This action returns all leadLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadLog`;
  }

  update(id: number, updateLeadLogDto: UpdateLeadLogDto) {
    return `This action updates a #${id} leadLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadLog`;
  }
}
