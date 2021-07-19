import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * passport js handler expects anormal request object (like express has)
 * and expects "password" and "email" fields to be in "request.body"
 *  but here we have gql context, so we overide "getRequest" so
 * the passprt handler gets what expects
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const request: Request = gqlCtx.getContext().req;
    // @ts-ignore
    request.body.email = gqlCtx.getArgs().loginUserInput.email;
    // @ts-ignore
    request.body.password = gqlCtx.getArgs().loginUserInput.password;
    return request;
  }
}
