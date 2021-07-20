import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/entity-modules/users/dto/user.inputs';
import {
  User,
  UserDocument,
} from 'src/entity-modules/users/entities/user.entity';
import { UsersService } from 'src/entity-modules/users/users.service';
import { hashText, verifyHashMatch } from 'src/utils/crypto';
import { AuthResult } from './dto/auth-result.obj';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private _issueAccessToken(user: User) {
    let accessToken = this.jwtService.sign(
      {
        sub: user.id,
        uid: user.id,
        role: user.role,
      },
      { secret: process.env.ACCESS_TOKEN_SECRET },
    );
    return accessToken;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await verifyHashMatch(pass, user.password))) return user;
    return null;
  }

  async register(data: CreateUserInput): Promise<AuthResult> {
    let password = await hashText(data.password);
    let user = await this.usersService.create({ ...data, password });
    let accessToken = this._issueAccessToken(user);
    user.accessTokens.push(accessToken);
    let updatedUser = await user.save();
    return { user: updatedUser, accessToken };
  }

  async login(user: UserDocument) {
    let accessToken = this._issueAccessToken(user);
    user.accessTokens.push(accessToken);
    let updatedUser = await user.save();
    return { user: updatedUser, accessToken };
  }

  async logout(user: UserDocument, token: string) {
    user.accessTokens.pull(token);
    await user.save();
  }

  async logoutAllDevices(user: UserDocument) {
    user.accessTokens = new mongoose.Types.Array();
    await user.save();
  }
}
