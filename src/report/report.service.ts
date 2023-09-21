import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import Asset from 'src/assets/entities/asset.entity';
import LeadStatus from 'src/lead_status/entities/lead_status.entity';
import Lead from 'src/leads/entities/lead.entity';

@Injectable()
export class ReportService {
  async getDashboard() {
    // eslint-disable-next-line prefer-const
    let asset = (await Asset.findAll({
      attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']],
      group: ['status'],
    })) as any;

    // eslint-disable-next-line prefer-const
    let lead = (await LeadStatus.findAll({
      attributes: [
        'id',
        'label',
        'color',
        [Sequelize.fn('COUNT', 'lead.status_id'), 'count'],
      ],
      include: [
        {
          model: Lead,
          attributes: [],
        },
      ],
      group: ['label'],
    })) as any;

    const total_followup = await Lead.count({
      where: {
        followup_date: {
          [Op.eq]: new Date().toISOString().split('T')[0],
        },
      },
    });

    return {
      asset: asset.reduce((acc: any, item: any) => {
        acc[item.status] = item.dataValues?.count || 0;
        return acc;
      }, {}),
      lead,
      total_followup,
    };
  }
}
