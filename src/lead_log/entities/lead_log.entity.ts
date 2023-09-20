import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  AllowNull,
  Default,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import Lead from '../../leads/entities/lead.entity';
import Employee from 'src/employees/entities/employee.entity';

@Table({
  tableName: 'lead_log',
})
class LeadLog extends Model<LeadLog> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  'id': number;

  @AllowNull(false)
  @Default('log')
  @Column(
    DataType.ENUM(
      'assign',
      'note',
      'conversation',
      'log',
      'status',
      'followup',
    ),
  )
  'type': string;

  @AllowNull(false)
  @ForeignKey(() => Lead)
  @Column(DataType.BIGINT)
  'lead_id': number;

  @BelongsTo(() => Lead)
  'lead': Lead;

  @Column
  'message': string;

  @Column
  'note': string;

  @Column
  'conversation': string;

  @AllowNull(false)
  @ForeignKey(() => Employee)
  @Column(DataType.BIGINT)
  'author_id': number;

  @BelongsTo(() => Employee)
  'author': Employee;

  @CreatedAt
  @Column({ field: 'created_at' })
  'created_at': Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  'updated_at': Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  'deleted_at': Date;

  // @AfterCreate
  // static async createLeadLog(lead: Lead) {
  //   const leadLog = await LeadLog.create({
  //     type: 'log',
  //     lead_id: lead.id,
  //     message: 'created lead',
  //     author_id: lead.assigned_to,
  //   });
  //   return leadLog;
  // }
}

export default LeadLog;
