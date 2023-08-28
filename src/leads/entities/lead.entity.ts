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
import Employee from 'src/employees/entities/employee.entity';
import LeadStatus from 'src/lead_status/entities/lead_status.entity';
import Media from 'src/media/entities/media.entity';

@Table({
  tableName: 'lead',
})
class Lead extends Model<Lead> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  'id': number;

  @Column
  'first_name': string;

  @Column
  'last_name': string;

  @AllowNull
  @IsEmail
  @Column
  'email': string;

  @Column
  'phone': string;

  @Column(DataType.ENUM('Male', 'Female', 'Non Binary'))
  'gender': string;

  @Column
  'address_line1': string;

  @AllowNull
  @Column
  'address_line2': string;

  @AllowNull
  @Column
  'company': string;

  @AllowNull
  @Column
  'designation': string;

  @Default('MEDIUM')
  @Column(DataType.ENUM('HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST'))
  'priority': string;

  @ForeignKey(() => Media)
  @AllowNull
  @Column(DataType.BIGINT)
  'media_id': number;

  @AllowNull
  @Column
  'media_commision': number;

  @ForeignKey(() => Employee)
  @AllowNull
  @Column(DataType.BIGINT)
  'assigned_to': number;

  @ForeignKey(() => LeadStatus)
  @Column(DataType.BIGINT)
  'status': number;

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

export default Lead;
