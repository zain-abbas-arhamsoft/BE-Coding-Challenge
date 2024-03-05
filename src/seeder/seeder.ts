import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Seeder {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async seed() {
    const hashedPassword = await bcrypt.hash('securePassword', 10);
    const user = new this.userModel({
      username: 'admin',
      password: hashedPassword,
      role: 'Admin',
    });
    await user.save();
  }
}
