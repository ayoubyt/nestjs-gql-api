import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from 'src/entity-modules/users/entities/user.entity';

@Schema()
@ObjectType()
export class Employee {
  @Field(() => ID)
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Prop({ required: true })
  @Field()
  @IsNotEmpty()
  lastName: string;

  @Prop({ unique: true, required: true })
  @Field()
  @IsEmail()
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => String)
  employerId: mongoose.Schema.Types.ObjectId;
}

export type EmployeeDocument = Employee & mongoose.Document;

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
