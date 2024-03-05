import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './Dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username });
  }

  async createUser(userDto: CreateUserDto): Promise<UserDocument> {
    const { username } = userDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async login(
    userDto: CreateUserDto,
  ): Promise<String | null> {

    const { username, password } = userDto;

    try {
      const user = await this.findByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const payload = { username: user.username, sub: user._id, role: user.role };
      return this.jwtService.sign(payload);
    }
    catch (error) {
      throw Error(error)
    }
  }
}
