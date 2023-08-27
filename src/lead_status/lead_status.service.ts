import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadStatusDto } from './dto/create-lead_status.dto';
import { UpdateLeadStatusDto } from './dto/update-lead_status.dto';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';
import LeadStatus from './entities/lead_status.entity';
import Pagination from 'src/utils/Pagination';
import { Op } from 'sequelize';

@Injectable()
export class LeadStatusService {
  async create(createLeadStatusDto: CreateLeadStatusDto) {
    const { label, value, color, type, from_status } = createLeadStatusDto;

    await LeadStatus.create({
      label,
      value,
      color,
      type,
      from_status,
    });

    return {
      statusCode: 201,
      message: `${label} registered as a lead status successfully`,
    };
  }

  async findAll(query: IPaginationQuery, type?: string) {
    const pagination = new Pagination(query);

    // get query from pagination
    const { limit, offset, paranoid } = pagination.get_attributes();

    const search_ops = pagination.get_search_ops(['label', 'value', 'type']);

    const filters = pagination.format_filters({
      type,
    });

    return pagination.arrange(
      await LeadStatus.findAndCountAll({
        where: {
          [Op.or]: search_ops,
          ...filters,
        },
        paranoid,
        limit,
        offset,
      }),
    );
  }

  async findOne(id: number) {
    const leadStatus = await LeadStatus.findByPk(id);

    if (!leadStatus) {
      throw new NotFoundException(`Lead Status not found`);
    }

    return {
      message: 'Lead Status fetched successfully',
      data: leadStatus,
    };
  }

  async update(id: number, updateLeadStatusDto: UpdateLeadStatusDto) {
    const { label, value, color, type, from_status } = updateLeadStatusDto;

    const leadStatus = await LeadStatus.findByPk(id);

    if (!leadStatus) {
      throw new NotFoundException(`Lead Status not found`);
    }

    await leadStatus.update({
      label,
      value,
      color,
      type,
      from_status,
    });

    return {
      message: 'Lead Status updated successfully',
    };
  }

  async remove(id: number) {
    const leadStatus = await LeadStatus.findByPk(id);

    if (!leadStatus) {
      throw new NotFoundException(`Lead Status not found`);
    }

    await leadStatus.destroy();

    return {
      message: 'Lead Status deleted successfully',
    };
  }
}
