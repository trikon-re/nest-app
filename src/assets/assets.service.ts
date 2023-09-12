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
        private_price,
        media_commision,
        ...address_and_flat,
      });

      return { message: 'Asset created successfully' };
    } catch (error) {
      throw new BadRequestException(error?.errors?.[0]?.message || error);
    }
  }

  async findAll(query: IPaginationQuery) {
    const pagination = new Pagination(query);

    // get query from pagination
    const { limit, offset, paranoid, trash_query } =
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

    return pagination.arrange(
      await Asset.findAndCountAll({
        where: {
          [Op.or]: search_ops,
          ...trash_query,
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
        offset,
        paranoid,
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
}
