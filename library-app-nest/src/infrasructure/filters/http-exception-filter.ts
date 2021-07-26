import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from'@nestjs/common';
import { Request, Response } from'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const { message: errorMessage, name: exceptionType } = exception;
        const details = { 
            timestamp: new Date().toISOString(),
            status: 'fail',
            code: status,
            data: {
                url: request.url,
                errorMessage,
                exceptionType
            }
        };
        console.log(details);
        response
            .status(status)
            .json(details);
    }
}

