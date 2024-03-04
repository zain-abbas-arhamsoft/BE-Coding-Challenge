import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../utils/auth.guard';
import { Seeder } from '../seeder';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    JwtModule.register({ secret: process.env.SECRET_KEY }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      strategies: [LocalStrategy],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, Seeder],
})
export class UserModule {}
