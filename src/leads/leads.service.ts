import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';
import Lead from './entities/lead.entity';
import Pagination from 'src/utils/Pagination';
import { Op } from 'sequelize';
import LeadStatus from 'src/lead_status/entities/lead_status.entity';
import Media from 'src/media/entities/media.entity';
import Employee from 'src/employees/entities/employee.entity';
import InterestedBuyers from 'src/assets/entities/interested_buyers.entity';

@Injectable()
export class LeadsService {
  async create(createLeadDto: CreateLeadDto, author: any) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        address_line1,
        address_line2,
        company,
        designation,
        priority,
        media_id,
        media_commision,
        assigned_to,
        gender,
        status_id,
      } = createLeadDto;

      await Lead.create({
        first_name,
        last_name,
        email,
        phone,
        address_line1,
        address_line2,
        company,
        designation,
        priority,
        media_id,
        media_commision,
        assigned_to,
        gender,
        status_id,
        created_by_id: author?.id,
      });

      return { message: 'Lead created successfully' };
    } catch (error) {
      throw new BadRequestException(error?.errors?.[0]?.message || error);
    }
  }

  async findAll(
    query: IPaginationQuery,
    gender?: string,
    priority?: string,
    status_id?: number,
    assigned_to?: number,
  ) {
    const pagination = new Pagination(query);

    // get query from pagination
    const { limit, offset, paranoid, trash_query } =
      pagination.get_attributes();

    const search_ops = pagination.get_search_ops([
      'first_name',
      'last_name',
      'email',
      'phone',
      'address_line1',
      'address_line2',
      'company',
      'designation',
      'priority',
    ]);

    const filters = pagination.format_filters({
      gender,
      priority,
      status_id,
      assigned_to,
    });

    return pagination.arrange(
      await Lead.findAndCountAll({
        where: {
          [Op.or]: search_ops,
          ...filters,
          ...trash_query,
        },
        include: [
          {
            model: LeadStatus,
            as: 'status',
            attributes: ['id', 'label', 'value', 'color', 'type'],
          },
          {
            model: Media,
            as: 'media',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'email',
              'phone',
              'gender',
            ],
          },
          {
            model: Employee,
            as: 'assignee',
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
        limit,
        offset,
        paranoid,
      }),
    );
  }

  async findOne(id: number) {
    const lead = await Lead.findByPk(id, {
      include: [
        {
          model: LeadStatus,
          as: 'status',
          attributes: ['id', 'label', 'value', 'color', 'type'],
        },
        {
          model: Media,
          as: 'media',
          attributes: [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'gender',
          ],
        },
        {
          model: Employee,
          as: 'assignee',
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
      paranoid: false,
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return { message: 'Lead found', data: lead };
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    const lead = await Lead.findByPk(id);

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    const {
      first_name,
      last_name,
      email,
      phone,
      address_line1,
      address_line2,
      company,
      designation,
      priority,
      media_id,
      media_commision,
      gender,
      assigned_to,
      status_id,
    } = updateLeadDto;

    await lead.update({
      first_name,
      last_name,
      email,
      phone,
      address_line1,
      address_line2,
      company,
      designation,
      priority,
      media_id,
      media_commision,
      assigned_to,
      gender,
      status_id,
    });

    return { message: 'Lead updated successfully' };
  }

  async remove(id: number, permanent?: boolean, restore?: boolean) {
    const lead = await Lead.findByPk(id, {
      paranoid: false,
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    if (permanent) {
      await lead.destroy({ force: true });
      return { message: 'Lead deleted permanently' };
    } else if (restore) {
      if (lead.deleted_at === null)
        throw new BadRequestException('Lead is not deleted');
      lead.restore();
      return { message: 'Lead restored successfully' };
    }

    await lead.destroy();

    return { message: 'Lead deleted successfully' };
  }

  async findIterestedProperties(id: number) {
    const lead = await Lead.findByPk(id);

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return {
      message: 'Interested properties found',
      data:
        (await lead.$get('interested_properties', {
          raw: true,
        })) || [],
    };
  }

  async addIterestedProperties(id: number, property_id: number) {
    try {
      await InterestedBuyers.create({
        lead_id: id,
        asset_id: property_id,
      });
      return {
        message: 'Interest added successfully',
      };
    } catch (error) {
      throw new BadRequestException(error?.errors?.[0]?.message || error);
    }
  }

  async removeIterestedProperties(id: number) {
    const lead = await InterestedBuyers.findByPk(id, {
      paranoid: false,
    });

    if (!lead) {
      throw new NotFoundException('Data not found');
    }

    await lead.destroy({ force: true });
    return { message: 'Interest deleted permanently' };
  }
}
