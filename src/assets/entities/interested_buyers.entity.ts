import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import Asset from './asset.entity';
import Lead from 'src/leads/entities/lead.entity';

@Table({
  tableName: 'interested_buyers',
})
class InterestedBuyers extends Model<InterestedBuyers> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  'id': number;

  @Unique(false)
  @ForeignKey(() => Asset)
  @Column(DataType.BIGINT)
  asset_id: number;

  @Unique(false)
  @ForeignKey(() => Lead)
  @Column(DataType.BIGINT)
  lead_id: number;

  @BelongsTo(() => Asset)
  asset: Asset;

  @BelongsTo(() => Lead)
  lead: Lead;

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

export default InterestedBuyers;
