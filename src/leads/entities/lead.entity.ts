import moment from 'moment';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  AllowNull,
  IsEmail,
  Default,
  BelongsTo,
  BelongsToMany,
  AfterCreate,
  AfterUpdate,
} from 'sequelize-typescript';
import Asset from 'src/assets/entities/asset.entity';
import InterestedBuyers from 'src/assets/entities/interested_buyers.entity';
import Employee from 'src/employees/entities/employee.entity';
import LeadLog from 'src/lead_log/entities/lead_log.entity';
import LeadStatus from 'src/lead_status/entities/lead_status.entity';
import Media from 'src/media/entities/media.entity';

@Table({
  tableName: 'lead',
})
class Lead extends Model<Lead> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  'id': number;

  @AllowNull(false)
  @Column
  'first_name': string;

  @AllowNull(false)
  @Column
  'last_name': string;

  @AllowNull
  @IsEmail
  @Column
  'email': string;

  @AllowNull(false)
  @Column
  'phone': string;

  @AllowNull(false)
  @Column(DataType.ENUM('Male', 'Female', 'Non Binary'))
  'gender': string;

  @AllowNull(false)
  @Column
  'address_line1': string;

  @AllowNull
  @Column
  'address_line2': string;

  @AllowNull
  @Column
  'company': string;

  @AllowNull
  @Column
  'designation': string;

  @AllowNull(false)
  @Default('MEDIUM')
  @Column(DataType.ENUM('HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST'))
  'priority': string;

  @ForeignKey(() => Media)
  @AllowNull
  @Column(DataType.BIGINT)
  'media_id': number;

  @BelongsTo(() => Media)
  'media': Media;

  @AllowNull
  @Column
  'media_commision': number;

  @ForeignKey(() => Employee)
  @AllowNull
  @Column(DataType.BIGINT)
  'assigned_to': number;

  @BelongsTo(() => Employee)
  'assignee': Employee;

  @AllowNull(false)
  @ForeignKey(() => LeadStatus)
  @Column(DataType.BIGINT)
  'status_id': number;

  @BelongsTo(() => LeadStatus)
  'status': LeadStatus;

  @Column(DataType.DATEONLY)
  'followup_date': Date;

  @BelongsToMany(() => Asset, () => InterestedBuyers)
  'interested_properties': Asset[];

  @ForeignKey(() => Employee)
  @Column(DataType.BIGINT)
  'created_by_id': number;

  @BelongsTo(() => Employee)
  'created_by': Employee;

  @ForeignKey(() => Employee)
  @Column(DataType.BIGINT)
  'updated_by_id': number;

  @BelongsTo(() => Employee)
  'updated_by': Employee;

  @ForeignKey(() => Employee)
  @Column(DataType.BIGINT)
  'deleted_by_id': number;

  @BelongsTo(() => Employee)
  'deleted_by': Employee;

  @CreatedAt
  @Column({ field: 'created_at' })
  'created_at': Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  'updated_at': Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  'deleted_at': Date;

  @AfterCreate
  static async createLeadLog(lead: Lead) {
    try {
      await LeadLog.create({
        type: 'log',
        lead_id: lead.dataValues.id,
        message: 'created lead',
        author_id: lead.dataValues.created_by_id,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  @AfterUpdate
  static async updateLeadLog(lead: Lead) {
    try {
      // eslint-disable-next-line no-var
      var changed_fields = lead.changed();

      if (!changed_fields || changed_fields.length === 0) return;

      changed_fields = changed_fields.filter(
        (field) => field !== 'updated_by_id',
      );

      if (changed_fields.length === 0) return;

      // if status is changed
      if (changed_fields?.includes?.('status_id')) {
        // Check if status is changed or created
        if (lead.previous('status_id')) {
          // find previous status
          const lead_status = await LeadStatus.findOne({
            where: {
              id: lead.previous('status_id'),
            },
          });
          // create log
          await LeadLog.create({
            type: 'status',
            lead_id: lead.dataValues.id,
            message: `changed the status from ${lead_status.get('label')} to ${(
              await lead.$get('status')
            ).get('label')}`,
            author_id: lead.dataValues.updated_by_id,
          });
        } else {
          // create log for new status
          await LeadLog.create({
            type: 'status',
            lead_id: lead.dataValues.id,
            message: `flagged with the status ${(
              await lead.$get('status')
            ).get('label')}`,
            author_id: lead.dataValues.updated_by_id,
          });
        }
        // remove status from changed fields
        changed_fields = changed_fields.filter(
          (field) => field !== 'status_id',
        );
      }

      // if assignee is changed
      if (changed_fields?.includes?.('assigned_to')) {
        // Check if assignee is changed or created
        if (lead.previous('assigned_to')) {
          // find previous assignee
          const assignee = await Employee.findOne({
            where: {
              id: lead.previous('assigned_to'),
            },
          });
          // create log
          await LeadLog.create({
            type: 'assign',
            lead_id: lead.dataValues.id,
            message: `changed the assignee from ${assignee.get(
              'first_name',
            )} ${assignee.get('last_name')} to ${(
              await lead.$get('assignee')
            ).get('first_name')} ${(
              await lead.$get('assignee')
            ).get('last_name')}`,
            author_id: lead.dataValues.updated_by_id,
          });
        } else {
          // create log for new assignee
          await LeadLog.create({
            type: 'assign',
            lead_id: lead.dataValues.id,
            message: `assigned to ${(
              await lead.$get('assignee')
            ).get('first_name')} ${(
              await lead.$get('assignee')
            ).get('last_name')}`,
            author_id: lead.dataValues.updated_by_id,
          });
        }

        // remove assignee from changed fields
        changed_fields = changed_fields.filter(
          (field) => field !== 'assigned_to',
        );
      }

      // if followup is changed
      if (changed_fields?.includes?.('followup_date')) {
        // Check if followup is changed or created
        if (lead.previous('followup_date')) {
          // create log
          await LeadLog.create({
            type: 'followup',
            lead_id: lead.dataValues.id,
            message: `changed the followup date from ${moment(
              lead.previous('followup_date'),
            ).format('lll')} to ${moment(lead.get('followup_date')).format(
              'lll',
            )}`,
            author_id: lead.dataValues.updated_by_id,
          });
        } else {
          // create log for new followup
          await LeadLog.create({
            type: 'followup',
            lead_id: lead.dataValues.id,
            message: `added followup date on ${moment(
              lead.get('followup_date'),
            ).format('lll')}`,
            author_id: lead.dataValues.updated_by_id,
          });
        }
        // remove followup from changed fields
        changed_fields = changed_fields.filter(
          (field) => field !== 'followup_date',
        );
      }

      if (!changed_fields && changed_fields.length === 0) return;

      await LeadLog.create({
        type: 'log',
        lead_id: lead.dataValues.id,
        message: `updated ${changed_fields.join(', ')} of lead`,
        author_id: lead.dataValues.updated_by_id,
      });
    } catch (error) {
      console.warn(error);
    }
  }
}

export default Lead;
