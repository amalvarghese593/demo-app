import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;

    if (url !== '/healthz') {
      console.log('Started route:', url, method);
    }
    return next.handle().pipe(
      tap(() => {
        if (url !== '/healthz') {
          console.log('Finished route:', url, method);
        }
      }),
      catchError((err) => {
        console.error(
          `Error occured in route: ${url} ${method}, error:${err.message}, time: ${new Date().toLocaleString()}`,
          err,
        );
        return throwError(() => err);
      }),
    );
  }
}
