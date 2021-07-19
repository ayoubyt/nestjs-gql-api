import { Module } from '@nestjs/common';
import { UsersModule } from 'src/entity-modules/users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './passport.strategies';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
