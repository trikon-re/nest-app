import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @ApiProperty({
    enum: ['FLAT', 'LAND'],
  })
  type: string;

  @ApiProperty()
  size: number;

  @ApiProperty({
    enum: ['SQFT', 'KATHA', 'BIGHA', 'ACRES', 'SHOTOK', 'DECIMAL'],
  })
  size_unit: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  media_id: number;

  @ApiProperty()
  media_commision: number;

  @ApiProperty({
    enum: ['New', 'Booked', 'Sold'],
  })
  status: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  completion_status: string;

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  is_land_share: boolean;

  @ApiProperty()
  land_type: string;

  @ApiProperty()
  private_price: number;

  @ApiProperty()
  'address.line1': string;

  @ApiProperty()
  'address.line2': string;

  @ApiProperty()
  'address.plot': string;

  @ApiProperty()
  'address.road': string;

  @ApiProperty()
  'address.sector': string;

  @ApiProperty()
  'address.block': string;

  @ApiProperty()
  'address.area': string;

  @ApiProperty()
  'address.city': string;

  @ApiProperty()
  'address.country': string;

  @ApiProperty()
  'flat.floor': number;

  @ApiProperty()
  'flat.apt_no': string;

  @ApiProperty()
  'flat.house_no': string;

  @ApiProperty()
  'flat.num_bathroom': number;

  @ApiProperty()
  'flat.num_bedroom': number;

  @ApiProperty()
  'flat.num_balcony': number;

  @ApiProperty()
  'flat.has_parking': boolean;

  @ApiProperty()
  'flat.has_lift': boolean;

  @ApiProperty()
  'flat.facing_side': string;

  @ApiProperty()
  'flat.is_used': boolean;

  @ApiProperty()
  'flat.handovered_at': Date;
}
