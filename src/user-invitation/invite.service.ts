import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';
import { Invite, InviteDocument } from '../models/invite.model';
import * as randomatic from 'randomatic';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite.name)
    private readonly inviteModel: Model<InviteDocument>,
  ) {}

  async createInvite(@Request() req): Promise<Invite> {
    const { userId } = req;
    const code = randomatic('Aa0', 6); // Generates a random code with uppercase letters, lowercase letters, and numbers
    const invite = await this.inviteModel.findOne({ userId });
    if (invite) {
      // Resending the invite, update the expiration date
      invite.expiresAt = moment().add(1, 'hour').toDate();
      invite.code = code;
      return invite;
    } else {
      // Create a new invite
      const newInvite = new this.inviteModel({
        userId,
        code,
        expiresAt: moment().add(1, 'hour').toDate(),
      });
      return this.inviteModel.create(newInvite);
    }
  }
}
