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
  HasMany,
} from 'sequelize-typescript';
import Lead from 'src/leads/entities/lead.entity';

@Table({
  tableName: 'lead_status',
})
class LeadStatus extends Model<LeadStatus> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  'id': number;

  @AllowNull(false)
  @Column
  'label': string;

  @AllowNull(false)
  @Column
  'value': string;

  @AllowNull(false)
  @Column
  'color': string;

  @AllowNull
  @Column(DataType.ENUM('RAW', 'DONE', 'JUNK'))
  'type': string;

  @ForeignKey(() => LeadStatus)
  @AllowNull
  @Column(DataType.BIGINT)
  'from_status': number;

  @HasMany(() => Lead)
  'leads': Lead[];

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
