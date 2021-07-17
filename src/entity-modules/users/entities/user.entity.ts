import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id : mongoose.Schema.Types.ObjectId;
  @Field()
  @Prop()
  firstName: string;
  @Field()
  @Prop()
  lastName : string;
  @Field()
  @Prop({unique: true})
  email : string;
  @Prop()
  password: string;
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);

