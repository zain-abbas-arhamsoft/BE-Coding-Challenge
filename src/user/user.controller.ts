import {
  Controller,
  Post,
  Body,
  Response,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async create(
    @Response() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    try {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'User logged in successfully.',
        data: await this.userService.createUser(createUserDto),
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('login')
  async login(@Response() res, @Body() userDTO: CreateUserDto) {
    try {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'User logged in successfully.',
        data: await this.userService.login(userDTO),
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
