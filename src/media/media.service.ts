import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';
import Media from './entities/media.entity';
import Pagination from 'src/utils/Pagination';
import { Op } from 'sequelize';

@Injectable()
export class MediaService {
  async create(createMediaDto: CreateMediaDto) {
    const {
      first_name,
      last_name,
      email,
      phone,
      dob,
      address_line1,
      address_line2,
      display_picture,
      gender,
    } = createMediaDto;

    await Media.create({
      first_name,
      last_name,
      email,
      phone,
      dob,
      address_line1,
      address_line2,
      display_picture,
      gender,
    });

    return {
      statusCode: 201,
      message: `${first_name} registered as an media successfully`,
    };
  }

  async findAll(query: IPaginationQuery, gender?: string) {
    const pagination = new Pagination(query);

    // get query from pagination
    const { limit, offset, paranoid, trash_query } =
      pagination.get_attributes();

    const search_ops = pagination.get_search_ops([
      'first_name',
      'last_name',
      'email',
      'phone',
    ]);

    const filters = pagination.format_filters({
      gender: gender,
    });

    return pagination.arrange(
      await Media.findAndCountAll({
        where: {
          [Op.or]: search_ops,
          ...filters,
          ...trash_query,
        },
        paranoid,
        limit,
        offset,
      }),
    );
  }

  async findOne(id: number) {
    const media = await Media.findByPk(id);

    if (!media) {
      throw new NotFoundException(`Media not found`);
    }

    return {
      message: 'Media fetched successfully',
      data: media,
    };
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const {
      first_name,
      last_name,
      email,
      phone,
      dob,
      address_line1,
      address_line2,
      display_picture,
      gender,
    } = updateMediaDto;

    const media = await Media.findByPk(id);

    if (!media) {
      throw new NotFoundException(`Media not found`);
    }

    await media.update({
      first_name,
      last_name,
      email,
      phone,
      dob,
      address_line1,
      address_line2,
      display_picture,
      gender,
    });

    return {
      message: 'Media updated successfully',
    };
  }

  async remove(id: number) {
    const media = await Media.findByPk(id);

    if (!media) {
      throw new NotFoundException(`Media not found`);
    }

    await media.destroy();

    return {
      message: 'Media deleted successfully',
    };
  }
}
