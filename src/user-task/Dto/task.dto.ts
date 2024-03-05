import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  userId: string;

  @IsEnum(['pending', 'completed'])
  status: 'pending' | 'completed';
}
