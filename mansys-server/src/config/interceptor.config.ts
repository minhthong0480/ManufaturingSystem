import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl: url } = request;

    response.on('close', () => {
      this.logger.log(`${method} ${url} - ${JSON.stringify(request.body)}`);
    });

    next();
  }
}
