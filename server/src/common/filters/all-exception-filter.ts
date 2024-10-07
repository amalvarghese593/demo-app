import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let errorStack: unknown;
    let exceptionResponse: unknown;
    let httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      exceptionResponse = exception.getResponse();
      errorStack = exception.stack;
    }

    console.error(
      `Exception caught by AllExceptionFilter, time: ${new Date().toLocaleString()}:`,
      request.url,
      request.method,
      exception,
      exceptionResponse,
      httpStatus,
      errorStack,
    );

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      message: exception,
      timestamp: new Date().toLocaleString(),
    };

    response.status(httpStatus).json(responseBody);
  }
}
