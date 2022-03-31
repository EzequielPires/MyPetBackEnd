import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessagesHelper } from 'src/helper/messages.helper';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(200)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: MessagesHelper.PASSWORD_OR_EMAIL_INVALID
      });
  }
}