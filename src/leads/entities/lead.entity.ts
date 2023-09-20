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
        message: 'Lead Created',
        author_id: lead.dataValues.created_by_id,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  @AfterUpdate
  static async updateLeadLog(lead: Lead) {
    try {
      console.log(lead);
      // await LeadLog.create({
      //   type: 'log',
      //   lead_id: lead.dataValues.id,
      //   message: 'Lead Updated',
      //   author_id: lead.dataValues.updated_by_id,
      // });
    } catch (error) {
      console.warn(error);
    }
  }
}

export default Lead;
