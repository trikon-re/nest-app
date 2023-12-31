import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';
import Asset from './entities/asset.entity';
import Pagination from 'src/utils/Pagination';
import { Op } from 'sequelize';

@Injectable()
export class AssetsService {
  async create(createAssetDto: CreateAssetDto) {
    try {
      const {
        type,
        size,
        size_unit,
        price,
        description,
        status,
        media_id,
        completion_status,
        remarks,
        title,
        is_land_share,
        land_type,
        private_price,
        media_commision,
        ...address_and_flat
      } = createAssetDto;

      await Asset.create({
        type,
        size,
        size_unit,
        price,
        description,
        status,
        media_id,
        completion_status,
        remarks,
        title,
        is_land_share,
        land_type,
        private_price,
        media_commision,
        ...address_and_flat,
      });

      return { message: 'Asset created successfully' };
    } catch (error) {
      throw new BadRequestException(error?.errors?.[0]?.message || error);
    }
  }

  async findAll(
    query: IPaginationQuery,
    type?: string,
    status?: string,
    area?: string,
    using_type?: string,
    size_unit?: string,
    max_budget?: number,
    max_size?: number,
    min_budget?: number,
    min_size?: number,
    media_id?: number,
  ) {
    const pagination = new Pagination(query);

    // get query from pagination
    const { limit, offset, paranoid, order, trash_query } =
      pagination.get_attributes();

    const search_ops = pagination.get_search_ops([
      'address.line1',
      'address.line2',
      'address.plot',
      'address.road',
      'address.sector',
      'address.block',
      'address.area',
      'address.city',
      'address.country',
    ]);

    const filters = pagination.format_filters({
      type,
      status,
      'address.area': area,
      'flat.is_used':
        using_type === 'new' ? false : using_type === 'used' ? true : null,
      size_unit,
      media_id,
    });

    return pagination.arrange(
      await Asset.findAndCountAll({
        where: {
          [Op.or]: search_ops,
          ...filters,
          ...trash_query,
          ...(!isNaN(min_size) || !isNaN(max_size)
            ? {
                size: isNaN(min_size)
                  ? { [Op.lte]: max_size }
                  : isNaN(max_size)
                  ? { [Op.gte]: min_size }
                  : { [Op.between]: [min_size, max_size] },
              }
            : {}),
          ...(!isNaN(min_budget) || !isNaN(max_budget)
            ? {
                price: isNaN(min_budget)
                  ? { [Op.lte]: max_budget }
                  : isNaN(max_budget)
                  ? { [Op.gte]: min_budget }
                  : { [Op.between]: [min_budget, max_budget] },
              }
            : {}),
        },

        include: [
          {
            association: 'media',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'email',
              'phone',
              'gender',
            ],
          },
        ],
        limit,
        order,
        offset,
        paranoid,
        raw: true,
      }),
    );
  }

  async findOne(id: number) {
    const asset = await Asset.findByPk(id, {
      paranoid: false,
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return { message: 'Asset found', data: asset };
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    try {
      const asset = await Asset.findByPk(id);

      if (!asset) {
        throw new NotFoundException('Asset not found');
      }

      const {
        type,
        size,
        size_unit,
        price,
        description,
        status,
        media_id,
        completion_status,
        remarks,
        title,
        is_land_share,
        land_type,
        private_price,
        media_commision,
        ...address_and_flat
      } = updateAssetDto;

      await asset.update({
        type,
        size_unit,
        size,
        price,
        description,
        status,
        media_id,
        completion_status,
        remarks,
        title,
        is_land_share,
        land_type,
        private_price,
        media_commision,
        ...address_and_flat,
      });

      return { message: 'Asset updated successfully' };
    } catch (error) {
      throw new BadRequestException(error?.errors?.[0]?.message || error);
    }
  }

  async remove(id: number, permanent?: boolean, restore?: boolean) {
    const asset = await Asset.findByPk(id, {
      paranoid: false,
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    if (permanent) {
      await asset.destroy({ force: true });
      return { message: 'Asset deleted permanently' };
    } else if (restore) {
      if (asset.deleted_at === null) {
        throw new BadRequestException('Asset is not deleted');
      }
      asset.restore();
      return { message: 'Asset restored successfully' };
    }

    await asset.destroy();

    return { message: 'Asset deleted successfully' };
  }

  async findInterestedLeads(id: number) {
    const asset = await Asset.findByPk(id);

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return {
      message: 'Interested buyers found',
      data: (await asset.$get('interested_buyers')) || [],
    };
  }
}
