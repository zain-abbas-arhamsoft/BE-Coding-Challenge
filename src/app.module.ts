import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { InviteModule } from './user-invitation/invite.module';
import { TaskModule } from './user-task/task.module';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    InviteModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
