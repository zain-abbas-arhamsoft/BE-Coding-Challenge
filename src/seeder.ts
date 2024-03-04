import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user/models/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Seeder {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async seed() {
    if (this['seederHasRun']) {
      return;
    }
    const existingUser = await this.userModel
      .findOne({ username: 'admin' })
      .exec();
    if (existingUser) {
      console.log('Admin user already exists, skipping seeder.');
      return;
    }
    const hashedPassword = await bcrypt.hash('securePassword', 10);
    const user = new this.userModel({
      username: 'admin',
      password: hashedPassword,
      role: 'Admin',
    });
    await user.save();
    this['seederHasRun'] = true;
  }
}
