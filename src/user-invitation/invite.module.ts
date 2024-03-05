import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { InviteSchema } from '../models/invite.model';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/invite', method: RequestMethod.POST });
  }
}
