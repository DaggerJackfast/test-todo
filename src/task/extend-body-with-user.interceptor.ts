import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

Injectable();
export class ExtendBodyWithUserId implements NestInterceptor {
  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    request.body = { ...request.body, userId: request.user.id };
    return next.handle();
  }
}
