import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import Pagination from 'src/utils/Pagination';
import Session from './entities/session.entity';
import Employee from 'src/employees/entities/employee.entity';
import { IPaginationQuery } from 'src/utils/Pagination/dto/query.dto';

@Injectable()
export class SessionsService {
  async findAll(query: IPaginationQuery, employee?: number) {
    const pagination = new Pagination(query);

    // get query props
    const { limit, offset, paranoid, order, trash_query } =
      pagination.get_attributes();

    // get search object
    // const search_ops = pagination.get_search_ops([
    //   'address_details',
    //   'device_details',
    // ]);

    // get filter props
    const filters = pagination.format_filters({
      user_id: employee,
    });

    return pagination.arrange(
      await Session.findAndCountAll({
        where: {
          // [Op.or]: search_ops,
          ...filters,
          ...trash_query,
        },
        include: {
          model: Employee,
          as: 'user',
          attributes: [
            'id',
            'first_name',
            'last_name',
            'is_active',
            'deleted_at',
          ],
        },
        attributes: {
          exclude: ['user_id'],
        },
        limit,
        offset,
        paranoid,
        order,
      }),
    );
  }

  // Force Signout
  async forceSessionOut(id: number) {
    // find session
    const session = await Session.findByPk(id);

    // check if already logged out
    if (session?.logged_out_at !== null)
      throw new UnauthorizedException('This session is already signed out.');

    // logout session
    session.logged_out_at = new Date();
    session.save();

    return {
      message: `Session logged out successfully.`,
    };
  }

  // Delete Session
  async remove(id: number, permanent?: boolean, restore?: boolean) {
    // find session
    const session = await Session.findByPk(id, {
      paranoid: false,
    });

    // check if session exists
    if (!session) throw new NotFoundException('This session does not exist.');

    if (permanent) {
      session.destroy({ force: true });
      return {
        message: `Session deleted permanently.`,
      };
    } else if (restore) {
      if (session.deleted_at === null)
        throw new BadRequestException('This session is not deleted.');
      session.restore();
      return {
        message: `Session restored successfully.`,
      };
    }

    // check if session is already deleted
    if (session?.deleted_at !== null)
      throw new UnauthorizedException('This session is already deleted.');

    // check if already logged out
    if (session?.logged_out_at === null) {
      // logout session
      session.logged_out_at = new Date();
      session.save();
    }

    session.destroy();

    return {
      message: `Session deleted successfully.`,
    };
  }
}
