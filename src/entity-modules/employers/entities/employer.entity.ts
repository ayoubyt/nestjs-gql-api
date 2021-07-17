import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@ObjectType()
@Schema()
export class Employer {
  @Field(() => ID)
  _id : mongoose.Schema.Types.ObjectId;
  @Field()
  @Prop()
  firstName: string;
}

export type EmployerDocument = Employer & mongoose.Document;

export const EmployerSchema = SchemaFactory.createForClass(Employer);

