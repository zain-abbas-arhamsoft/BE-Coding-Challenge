import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment';
import { InviteDocument } from './models/invite.schema';
import { CreateInviteDto, InviteResponseDto } from './Dto/invite.dto';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel('Invite') private readonly inviteModel: Model<InviteDocument>,
  ) {}

  async createInvite(createInviteDto: CreateInviteDto) {
    const { email } = createInviteDto;
    const invite = new this.inviteModel({
      email,
      expiresAt: moment().add(1, 'hour').toDate(),
    });
    console.log('invite', invite);
    const existingInvite = await this.inviteModel.findOne({ email }).exec();
    console.log('existingInvite', existingInvite);
    if (existingInvite) {
      throw new HttpException('Invite already sent', HttpStatus.BAD_REQUEST);
    }
    await invite.save();
  }

  async inviteAlreadySent(email: string): Promise<boolean> {
    const invite = await this.inviteModel.findOne({ email }).exec();
    return !!invite;
  }
}
