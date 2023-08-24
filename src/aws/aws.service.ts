import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { nanoid } from 'nanoid';
import { extname } from 'path';

@Injectable()
export class AwsService {
  // AWS S3 Bucket Name
  bucketName = process.env.AWS_BUCKET_NAME;
  s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile(file: Express.Multer.File) {
    return await this.s3
      .upload({
        Bucket: this.bucketName,
        Body: file.buffer,
        Key: nanoid() + nanoid() + extname(file.originalname),
        ACL: 'public-read',
        ContentDisposition: 'inline',
      })
      .promise();
  }
}
