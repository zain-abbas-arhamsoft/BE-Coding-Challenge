import { IsString, IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  userId: Types.ObjectId;

  @IsEnum(['pending', 'completed'])
  status: 'pending' | 'completed';
}
