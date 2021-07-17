import { Module } from '@nestjs/common';
import { UsersModule } from 'src/entity-modules/users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}
