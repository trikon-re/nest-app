import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';
import Asset from './entities/asset.entity';
import Pagination from 'src/utils/Pagination';
import { Op } from 'sequelize';

@Injectable()
export class AssetsService {
  async create(createAssetDto: CreateAssetDto) {
    const {
      type,
      size,
      price,
      media_id,
      media_commision,
      ...address_and_flat
    } = createAssetDto;

    await Asset.create({
      type,
      size,
      price,
      media_id,
      media_commision,
      ...address_and_flat,
    });

    return { message: 'Asset created successfully' };
  }

  async findAll(query: IPaginationQuery) {
    const pagination = new Pagination(query);

    // get query from pagination
    const { limit, offset, paranoid } = pagination.get_attributes();

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
        },
        limit,
        offset,
        paranoid,
      }),
    );
  }

  async findOne(id: number) {
    const asset = await Asset.findByPk(id);

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return { message: 'Asset found', data: asset };
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    const asset = await Asset.findByPk(id);

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    const {
      type,
      size,
      price,
      media_id,
      media_commision,
      ...address_and_flat
    } = updateAssetDto;

    await asset.update({
      type,
      size,
      price,
      media_id,
      media_commision,
      ...address_and_flat,
    });

    return { message: 'Asset updated successfully' };
  }

  async remove(id: number) {
    const asset = await Asset.findByPk(id);

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    await asset.destroy();

    return { message: 'Asset deleted successfully' };
  }
}
