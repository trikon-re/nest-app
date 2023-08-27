import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import Role from './entities/role.entity';
import Pagination from 'src/utils/Pagination';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class RolesService {
  async create(createRoleDto: CreateRoleDto) {
    try {
      await Role.create(
        {
          ...createRoleDto,
        },
        {
          fields: ['name', 'description', 'prefix'],
        },
      );
      return {
        statusCode: 201,
        message: `${createRoleDto.name} role created successfully`,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create role',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async findAll(query: IPaginationQuery) {
    const pagination = new Pagination(query);

    // get query props
    const { limit, offset, paranoid } = pagination.get_attributes();

    // get search object
    const search_ops = pagination.get_search_ops(['name']);

    return pagination.arrange(
      await Role.findAndCountAll({
        where: {
          [Op.or]: search_ops,
        },
        attributes: {
          include: [
            // Count employees and permissions for each role
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM employee AS e WHERE e.role_id = Role.id)`,
              ),
              'total_employees',
            ],
            [
              Sequelize.literal(
                '(SELECT COUNT(*) FROM permission AS p WHERE p.role_id = Role.id)',
              ),
              'total_permissions',
            ],
          ],
        },
        limit,
        offset,
        paranoid,
      }),
    );
  }

  async findOne(id: number) {
    {
      const role = await Role.findByPk(id, {
        // attributes: {
        //   exclude: ['password'],
        // },
      });

      if (!role) {
        throw new NotFoundException(`Role with id ${id} not found`);
      }

      return {
        statusCode: 200,
        message: 'Information fetched successfully',
        data: role,
      };
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const { name, description, prefix } = updateRoleDto;

      const role = await Role.findByPk(id, {});

      if (!role) {
        throw new NotFoundException(`Role with id ${id} not found`);
      }

      await role.update({
        name,
        prefix,
        description,
      });

      return {
        statusCode: 200,
        message: 'Information updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to update',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async remove(id: number) {
    const role = await Role.findByPk(id, {
      include: ['assigned_employees', 'assigned_permissions'],
    });

    if (!role) throw new NotFoundException('No role found!');

    // Delete all associated employees and permissions
    await role.$get('assigned_employees');
    await role.$remove('assigned_employees', role.assigned_employees);

    // Delete the role
    await role.destroy();

    return {
      success: 200,
      message: 'Deleted successfully',
    };
  }
}
