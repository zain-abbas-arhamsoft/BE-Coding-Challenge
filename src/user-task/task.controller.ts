import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Response,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../user-task/Dto/task.dto';
import { TaskStatus, Task } from '../user-task/model/task.model';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  async createTask(
    @Response() res,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskDto> {
    try {
      const createdTask = await this.taskService.createTask(createTaskDto);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Task created successfully.',
        data: createdTask,
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  async getTaskById(
    @Response() res,
    @Param('id') id: ObjectId,
  ): Promise<CreateTaskDto> {
    try {
      const fetchTask = await this.taskService.getTaskById(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Fetch Task.',
        data: fetchTask,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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
