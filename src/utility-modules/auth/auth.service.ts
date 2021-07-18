import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/entity-modules/users/dto/user.inputs';
import { UsersService } from 'src/entity-modules/users/users.service';
import { verifyHashMatch } from 'src/helpers/crypto';
import { AuthResult } from './dto/auth-result.obj';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await verifyHashMatch(pass, user.password))) return user;
    return null;
  }

  async register(data: CreateUserInput): Promise<AuthResult> {
    let user = await this.usersService.create(data);
    let accessToken = await this.jwtService.sign(
      {
        sub: user.id,
        uid: user.id,
        role: user.role,
      },
      { secret: process.env.ACCESS_TOKEN_SECRET },
    );
    user.accessTokens.push(accessToken);
    let result = await user.save();
    return { user: result, accessToken };
  }
}
