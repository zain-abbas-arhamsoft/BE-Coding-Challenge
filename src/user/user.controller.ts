import { Controller, Post, Body, Response, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({
    summary: 'Create User',
    description: 'Creates a new user in the system',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been created',
    type: CreateUserDto,
  })
  @Post('signup')
  async create(@Response() res, @Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'User logged in successfully.',
        data: await this.userService.createUser(createUserDto)
      });
    }
    catch (error) {
      if (error instanceof HttpException) {
        return ;
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  }
  @ApiOperation({
    summary: 'Login User',
    description: 'Logs in a user with their username and password',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been logged in',
    type: CreateUserDto,
  })
  @Post('login')
  async login(@Response() res, @Body() userDTO: CreateUserDto) {
    try {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'User logged in successfully.',
          data: await this.userService.login(userDTO)
        });
    }
    catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
