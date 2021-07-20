import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/user.inputs';
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

  async findOneById(id: string) {
    let user = await this.userModel.findById(id);
    return user;
  }

  async findOneByEmail(email: string) {
    let user = await this.userModel.findOne({ email });
    return user;
  }

  async create(createEmployerInput: CreateUserInput) {
    let user = new this.userModel(createEmployerInput);
    return await user.save();
  }
}
