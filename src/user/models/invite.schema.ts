import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';
import { Types } from 'mongoose'; // import the Types object

export type InviteDocument = Invite & Document;
@Schema()
export class Invite {

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, default: () => moment().add(1, 'hour').toDate() })
  expiresAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

}

export const InviteSchema = SchemaFactory.createForClass(Invite);
