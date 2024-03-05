import { Injectable, HttpStatus, Response, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment';
import { Invite, InviteDocument } from './model/invite.schema';
import * as randomatic from 'randomatic';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite.name)
    private readonly inviteModel: Model<InviteDocument>,
  ) {}

  async createInvite(@Request() req, @Response() response) {
    const { userId } = req;
    if (!userId)
      throw new HttpException('user id not exsist', HttpStatus.BAD_REQUEST);
    const code = randomatic('Aa0', 6); // Generates a random code with uppercase letters, lowercase letters, and numbers
    let invite = await this.inviteModel.findOne({ userId }).exec();
    if (invite) {
      // Resending the invite, update the expiration date
      invite.expiresAt = moment().add(1, 'hour').toDate();
      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'Invitation re-sent.',
        data: {
          invite,
        },
      });
    } else {
      // Create a new invite
      invite = new this.inviteModel({
        userId,
        code,
        expiresAt: moment().add(1, 'hour').toDate(),
      });
      await invite.save();
      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'Invitation sent.',
        data: {
          invite,
        },
      });
    }
  }
}
