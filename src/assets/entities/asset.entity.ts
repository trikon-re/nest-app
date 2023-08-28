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

  @Column(DataType.ENUM('FLAT', 'LAND'))
  'type': string;

  @Column
  'size': number;

  @Column({
    type: DataType.STRING,
    set() {
      this.setDataValue(
        'sizeUnit',
        this.getDataValue('type') === 'FLAT' ? 'SQFT' : 'KATHA',
      );
    },
    get() {
      return this.getDataValue('type') === 'FLAT' ? 'SQFT' : 'KATHA';
    },
  })
  'size_unit': string;

  @Column
  'price': number;

  @ForeignKey(() => Media)
  @AllowNull
  @Column(DataType.BIGINT)
  'media_id': number;

  @AllowNull
  @Column
  'media_commision': number;

  @Column({
    type: DataType.JSON,
  })
  'address': {
    line1: string;
    line2: string;
    plot: string;
    road: string;
    sector: string;
    block: string;
    area: string;
    city: string;
    country: string;
  };

  @Column({
    type: DataType.JSON,
  })
  'flat': {
    floor: number;
    apt_no: string;
    house_no: string;
    num_bathroom: number;
    num_bedroom: number;
    num_balcony: number;
    has_parking: boolean;
    has_lift: boolean;
    facing_side: string;
    is_used: boolean;
    handovered_at: Date;
  };

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
