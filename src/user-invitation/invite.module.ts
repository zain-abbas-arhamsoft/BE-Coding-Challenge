import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { InviteSchema } from './model/invite.schema';
import { LoggerMiddleware } from '../utils/logger.middleware';
import { AuthInterceptor } from '../utils/auth.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
// export class InviteModule {}
export class InviteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('invite');
  }
}