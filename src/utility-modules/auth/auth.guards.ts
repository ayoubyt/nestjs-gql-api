import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const request: Request = gqlCtx.getContext().req;
    // @ts-ignore
    request.body.email = gqlCtx.getArgs().email;
    // @ts-ignore
    request.body.password = gqlCtx.getArgs().password;
    return request;
  }
}
