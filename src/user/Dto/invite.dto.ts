import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateInviteDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}
