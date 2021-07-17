import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterInput } from './dto/employer.inputs';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return await this.userModel.find().lean();
  }

  async findOne(id: string) {
    let user = await this.userModel.findOne({_id: id});
    return user;
  }

  async register(createEmployerInput: RegisterInput) {
    let user = new this.userModel(createEmployerInput);
    return await user.save();
  }

  // update(id: number, updateEmployerInput: UpdateEmployerInput) {
  //   return `This action updates a #${id} employer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} employer`;
  // }
}
