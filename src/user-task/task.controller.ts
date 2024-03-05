import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  Response,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../user-task/Dto/task.dto';
import { TaskStatus, Task } from '../user-task/model/task.model';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/')
  getTasks(@Request() req, @Response() res): Promise<CreateTaskDto[]> {
    return this.taskService.getTasks(req, res);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<CreateTaskDto> {
    return this.taskService.getTaskById(id);
  }

  @Put('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task | null> {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<CreateTaskDto> {
    return this.taskService.deleteTask(id);
  }
}
