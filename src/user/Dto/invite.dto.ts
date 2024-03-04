import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInviteDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;
}

export class InviteResponseDto {
  readonly id: string;
  readonly email: string;
  readonly expiresAt: Date;
}
