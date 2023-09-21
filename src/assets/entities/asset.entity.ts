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
  BelongsTo,
  BelongsToMany,
  Default,
} from 'sequelize-typescript';
import Lead from 'src/leads/entities/lead.entity';
import Media from 'src/media/entities/media.entity';
import InterestedBuyers from './interested_buyers.entity';

@Table({
  tableName: 'asset',
})
class Asset extends Model<Asset> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  'id': number;

  @AllowNull(false)
  @Column(DataType.ENUM('FLAT', 'LAND'))
  'type': string;

  @AllowNull(false)
  @Column
  'size': number;

  @AllowNull(false)
  @Column(DataType.ENUM('SQFT', 'KATHA', 'BIGHA', 'ACRES', 'SHOTOK', 'DECIMAL'))
  'size_unit': string;

  @AllowNull(false)
  @Column
  'price': number;

  @ForeignKey(() => Media)
  @AllowNull
  @Column(DataType.BIGINT)
  'media_id': number;

  @BelongsTo(() => Media)
  'media': Media;

  @AllowNull
  @Column
  'media_commision': number;

  @AllowNull(false)
  @Default('Latest')
  @Column(DataType.ENUM('Latest', 'In Progress', 'Booked', 'Sold', 'Cancelled'))
  'status': string;

  @AllowNull
  @Column
  'description': string;

  @AllowNull(false)
  @Column
  'address.line1': string;

  @AllowNull
  @Column
  'address.line2': string;

  @AllowNull
  @Column
  'address.plot': string;

  @AllowNull
  @Column
  'address.road': string;

  @AllowNull
  @Column
  'address.sector': string;

  @AllowNull
  @Column
  'address.block': string;

  @AllowNull
  @Column
  'address.area': string;

  @AllowNull
  @Column
  'address.city': string;

  @AllowNull
  @Column
  'address.country': string;

  @AllowNull
  @Column
  'flat.floor': number;

  @AllowNull
  @Column
  'flat.apt_no': string;

  @AllowNull
  @Column
  'flat.house_no': string;

  @AllowNull
  @Column
  'flat.num_bathroom': number;

  @AllowNull
  @Column
  'flat.num_bedroom': number;

  @AllowNull
  @Column
  'flat.num_balcony': number;

  @AllowNull
  @Column
  'flat.has_parking': boolean;

  @AllowNull
  @Column
  'flat.has_lift': boolean;

  @AllowNull
  @Column
  'flat.facing_side': string;

  @AllowNull
  @Column
  'flat.is_used': boolean;

  @AllowNull
  @Column
  'flat.handovered_at': Date;

  @BelongsToMany(() => Lead, () => InterestedBuyers)
  'interested_buyers': Lead[];
  @AllowNull
  @Column
  'private_price': number;

  @AllowNull
  @Column
  'completion_status': string;

  @AllowNull
  @Column
  'remarks': string;

  @AllowNull
  @Column
  'title': string;

  @AllowNull
  @Column
  'land_type': string;

  @AllowNull
  @Column
  'is_land_share': boolean;

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

export default Asset;
