import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './models/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authGuard';
import { Seeder } from '../seeder';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { InviteSchema } from './models/invite.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Invite', schema: InviteSchema },
    ]),
    JwtModule.register({ secret: 'secretKey' }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      strategies: [LocalStrategy],
    }),
  ],
  controllers: [UserController, InviteController],
  providers: [UserService, InviteService, LocalStrategy, Seeder],
})
export class UserModule {}
