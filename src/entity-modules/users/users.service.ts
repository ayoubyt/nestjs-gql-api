import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from './dto/user.inputs';
import { User, UserDocument, UserRole } from './entities/user.entity';

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

  async updateOne(
    userId: string,
    data: UpdateUserInput,
    currentUser: UserDocument,
  ) {
    if (currentUser.id === userId) {
      currentUser.set(data);
      return await currentUser.save();
    } else {
      if (currentUser.role !== UserRole.ADMIN)
        throw new ForbiddenException(`only admin can edit others data`);
      let other = await this.userModel.findById(userId);
      if (!other)
        throw new NotFoundException(`user with id '${userId}' not found`);
      if (other.role === UserRole.ADMIN)
        throw new ForbiddenException(``);
      other.set(data);
      return other.save();
    }
  }
}
