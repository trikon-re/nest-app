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
} from 'sequelize-typescript';

@Table({
  tableName: 'lead_status',
})
class LeadStatus extends Model<LeadStatus> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  'id': number;

  @Column
  'label': string;

  @Column
  'value': string;

  @Column
  'color': string;

  @AllowNull
  @Column(DataType.ENUM('RAW', 'DONE', 'JUNK'))
  'type': string;

  @ForeignKey(() => LeadStatus)
  @AllowNull
  @Column(DataType.BIGINT)
  'from_status': number;

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

export default LeadStatus;
