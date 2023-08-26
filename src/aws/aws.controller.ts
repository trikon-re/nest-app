import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { CreateAwDto } from './dto/create-aw.dto';

@ApiTags('AWS')
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateAwDto,
  })
  create(@UploadedFile() file: Express.Multer.File) {
    if (file) return this.awsService.uploadFile(file);
    else throw new BadRequestException();
  }
}
