import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/**
 * a validation pipe to check if a param
 * is a valid mongoose ObjectId
 */

@Injectable()
export class CheckObjectId implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!ObjectId.isValid(value))
      throw new BadRequestException(
        `${metadata.data}=${value} is not a valid object id`,
      );
    return value;
  }
}
