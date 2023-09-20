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

  @CreatedAt
  @Column({ field: 'created_at' })
  'created_at': Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  'updated_at': Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  'deleted_at': Date;
}

export default LeadLog;
