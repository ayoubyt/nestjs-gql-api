import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/entity-modules/users/dto/employer.inputs';
import { UsersService } from 'src/entity-modules/users/users.service';
import { verifyHashMatch } from 'src/helpers/crypto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await verifyHashMatch(pass, user.password)))
      return user;
    return null;
  }

  async register(data : CreateUserInput)
  {
    let user = this.usersService.create(data);
  }
}
