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
  Default,
  ForeignKey,
  BelongsTo,
  BeforeUpdate,
  BeforeCreate,
  Unique,
  HasMany,
} from 'sequelize-typescript';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import Role from 'src/roles/entities/role.entity';
import Session from 'src/sessions/entities/session.entity';

@Table({
  tableName: 'employee',
})
class Employee extends Model<Employee> {
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

  @Unique
  @AllowNull(false)
  @Column
  'username': string;

  @AllowNull
  @Column
  'password': string;

  @AllowNull(false)
  @Column(DataType.ENUM('Male', 'Female', 'Non Binary'))
  'gender': string;

  @AllowNull
  @Column
  'display_picture': string;

  @AllowNull
  @IsEmail
  @Column
  'email': string;

  @Unique
  @AllowNull(false)
  @Column
  'phone': string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  'dob': Date;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  'hired_date': Date;

  @Default(8)
  @Column
  'work_hour': number;

  @Default(0)
  @Column
  'salary': number;

  @AllowNull(true)
  @Column
  'bank': string;

  @AllowNull(true)
  @Column
  'nid_number': string;

  @AllowNull(true)
  @Column
  'nid_attachment': string;

  @AllowNull
  @Column
  'address': string;

  @AllowNull
  @Column
  'address2': string;

  @AllowNull
  @Column
  'cv': string;

  @Default(2)
  @Column
  'max_session': number;

  @Default(true)
  @Column
  'is_active': boolean;

  @AllowNull
  @Column
  'verified_at': Date;

  // Relations
  @ForeignKey(() => Role)
  @AllowNull
  @Column(DataType.BIGINT)
  'role_id': number;

  @BelongsTo(() => Role)
  'role': Role;

  @HasMany(() => Session)
  'sessions': Session[];

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
  static async hashPassword(instance: Employee) {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(instance.password, salt);
      instance.password = hashedPassword;
    }
  }
}

export default Employee;
