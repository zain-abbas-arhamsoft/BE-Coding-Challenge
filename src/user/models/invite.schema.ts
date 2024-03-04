import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';

export type InviteDocument = Invite & Document;

export class Invite {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: () => moment().add(1, 'hour').toDate() })
  expiresAt: string;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
