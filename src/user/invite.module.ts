import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { InviteSchema } from './models/invite.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class UserModule {}
