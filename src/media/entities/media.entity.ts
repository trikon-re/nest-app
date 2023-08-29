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
  AllowNull,
  IsEmail,
} from 'sequelize-typescript';

@Table({
  tableName: 'media',
})
class Media extends Model<Media> {
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
  @Column(DataType.DATEONLY)
  'dob': Date;

  @AllowNull(false)
  @Column
  'address_line1': string;

  @AllowNull
  @Column
  'address_line2': string;

  @AllowNull
  @Column
  'display_picture': string;

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

export default Media;
