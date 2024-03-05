import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { Seeder } from './seeder';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
