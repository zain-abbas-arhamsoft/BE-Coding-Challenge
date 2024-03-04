import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
                if (err || typeof decoded === 'string') {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                if (decoded.username !== 'admin') {
                    return res.status(403).json({ message: 'Forbidden' });
                }
                next();
            });
        } else {
            next();
        }
    }
}