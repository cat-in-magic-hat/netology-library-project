import { CallHandler, Injectable, NestInterceptor, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { catchError, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(res => ({
                status: "success",
                data: res
            })),
            catchError(err => {
                console.error(err);
                const { response, ...details } = err;
                return throwError(new InternalServerErrorException({
                    status: "fail",
                    data: details
                }));
            })
        );
    }
}
