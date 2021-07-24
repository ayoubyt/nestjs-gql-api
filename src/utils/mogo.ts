import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import * as mongoose from 'mongoose';

/**
 * a validation pipe to check if a param
 * is a valid mongoose ObjectId
 */

@Injectable()
export class CheckObjectId implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(value))
      throw new BadRequestException(
        `${metadata.data}=${value} is not a valid object id`,
      );
    return value;
  }
}

/**
 * this is an exception filter to catch mngodb errors to
 * not send them to the user as 500 (INTERNAL SERVER ERROR)
 * but as 400 (BAD REQUEST) instead
 */
@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    if (exception.name == 'MongoError')
      throw new BadRequestException(exception.message);
    else throw exception;
  }
}
