import { Controller, Post, Body, Response } from '@nestjs/common';
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
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.createUser(createUserDto);
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
    await this.userService.login(userDTO, res);
  }
}
