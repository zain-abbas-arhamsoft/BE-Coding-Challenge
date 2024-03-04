import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const token = req.cookies.token;

        if (token) {
            req.headers.authorization = `Bearer ${token}`;
        }

        return next.handle();
    }
}