import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateLeadLogDto } from './dto/create-lead_log.dto';
import LeadLog from './entities/lead_log.entity';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';
import Pagination from 'src/utils/Pagination';
import { Op } from 'sequelize';
import Employee from 'src/employees/entities/employee.entity';

@Injectable()
export class LeadLogService {
  async create(createLeadLogDto: CreateLeadLogDto, author?: any) {
    try {
      const { type, lead_id, note, conversation } = createLeadLogDto;

      await LeadLog.create({
        type,
        lead_id,
        note,
        conversation,
        message:
          type === 'note'
            ? 'added a note'
            : type === 'conversation'
            ? 'added a conversation'
            : '',
        author_id: author?.id,
      });

      return { message: 'Lead log created successfully' };
    } catch (error) {
      throw new BadRequestException(error?.errors?.[0]?.message || error);
    }
  }

  async findAll(query: IPaginationQuery, lead_id?: number) {
    const pagination = new Pagination(query);

    // get query from pagination
    const { limit, offset, paranoid, trash_query, order } =
      pagination.get_attributes();

    const search_ops = pagination.get_search_ops([
      'note',
      'conversation',
      'message',
    ]);

    const filters = pagination.format_filters({
      lead_id,
    });

    return pagination.arrange(
      await LeadLog.findAndCountAll({
        where: {
          [Op.or]: search_ops,
          ...filters,
          ...trash_query,
        },
        include: [
          {
            model: Employee,
            as: 'author',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'username',
              'gender',
              'display_picture',
            ],
          },
        ],
        order,
        limit,
        offset,
        paranoid,
      }),
    );
  }
}
