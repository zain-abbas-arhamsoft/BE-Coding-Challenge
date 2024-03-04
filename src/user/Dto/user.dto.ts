import { IsString, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export enum Role {
  Admin = 'Admin',
  Client = 'Client',
}
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'The username of the user',
    example: 'john.doe',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    type: String,
    description: 'The role of the user',
    example: 'Client',
    enum: ['Admin', 'Client'],
  })
  @ApiProperty()
  @IsEnum(Role)
  role: 'Admin' | 'Client';
}
