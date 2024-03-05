import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
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

  @Get('/list')
  async listTasks(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('title') title: string,
    @Query('status') status: string,
  ) {
    const queryOptions = {};
    if (title) {
      queryOptions['title'] = title;
    }
    if (status) {
      queryOptions['status'] = status;
    }
    const paginationOptions = { page, limit };
    return await this.taskService.listTasks(queryOptions, paginationOptions);
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
