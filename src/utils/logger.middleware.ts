import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Request } from './custom.request.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized',
        data: null,
      });
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
      if (typeof decoded === 'string') {
        res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Unauthorized',
          data: null,
        });
      } else {
        if (decoded.role !== 'admin') {
          return res.status(HttpStatus.FORBIDDEN).json({
            success: false,
            message: 'Forbidden',
            data: null,
          });
        } else {
          (req as Request).userId = decoded?.sub;
          next();
        }
      }
    }
  }
}
