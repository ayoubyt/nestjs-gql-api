import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { stringToEnumMiddleware } from 'src/helpers/gql';
import { enumToArray } from 'src/helpers/utils';

export enum UserRole {
  ADMIN,
  USER,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ unique: true, required: true })
  @Field()
  email: string;

  @Prop({ type: String, enum: enumToArray(UserRole), default: 'USER' })
  @Field(() => UserRole, { middleware: [stringToEnumMiddleware(UserRole)] })
  role: UserRole;

  @Prop({ required: true })
  password: string;

  @Prop([String])
  accessTokens: string[];
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);
