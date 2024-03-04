import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../model/task.model';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status: TaskStatus;
}