import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    userId: string;

    @IsEnum(['pending', 'ongoing', 'completed'])
    status: 'pending' | 'ongoing' | 'completed';
}
