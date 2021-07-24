import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { stringToEnumMiddleware } from 'src/utils/gql';
import { enumToArray } from 'src/utils/utils';

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}


registerEnumType(UserRole, {
  name: 'UserRole',
});
@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ unique: true, required: true })
  @Field()
  @IsEmail()
  email: string;

  @Prop({ type: String, enum: enumToArray(UserRole), default: 'USER' })
  @Field(() => UserRole, { middleware: [stringToEnumMiddleware(UserRole)] })
  role: UserRole;

  @Prop({ required: true })
  @IsNotEmpty()
  password: string;

  @Prop([String])
  accessTokens: mongoose.Types.Array<string>;
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);
