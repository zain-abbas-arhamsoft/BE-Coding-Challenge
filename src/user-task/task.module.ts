import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from '../user-task/task.controller';
import { TaskService } from '../user-task/task.service';
import * as dotenv from 'dotenv';
import { TaskSchema } from './model/task.model';
import { LoggerMiddleware } from '../utils/logger.middleware';
dotenv.config();

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/task', method: RequestMethod.GET });
  }
}
