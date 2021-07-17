import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/entity-modules/users/dto/employer.inputs';
import { GqlLocalAuthGuard } from './auth.guards';
import { AuthResult } from './dto/auth-result.obj';

@Resolver(() => AuthResult)
export class AuthResolver {
    @Mutation(() => AuthResult)
    register(@Args("createUserInput") data: CreateUserInput)
    {

    }
}
