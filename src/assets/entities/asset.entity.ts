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
  BeforeUpdate,
  BeforeCreate,
  BelongsTo,
} from 'sequelize-typescript';
import Media from 'src/media/entities/media.entity';

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
  @Column
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

  @CreatedAt
  @Column({ field: 'created_at' })
  'created_at': Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  'updated_at': Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  'deleted_at': Date;

  //hooks
  @BeforeUpdate
  @BeforeCreate
  static async setSizeUnit(instance: Asset) {
    if (instance.changed('type')) {
      instance.setDataValue(
        'size_unit',
        instance.getDataValue('type') === 'FLAT' ? 'SQFT' : 'KATHA',
      );

      console.log('hello');
    }
  }
}

export default Asset;
