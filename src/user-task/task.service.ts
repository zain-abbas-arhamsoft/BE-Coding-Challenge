import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Task, TaskDocument, TaskStatus } from './model/task.model';
import { CreateTaskDto } from './Dto/task.dto';
@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  async getTaskById(id: ObjectId): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  async listTasks(
    queryOptions: Record<string, unknown>,
    paginationOptions: Record<string, number>,
  ) {
    const { page, limit } = paginationOptions;
    const skippedTasks = (page - 1) * limit;
    return await this.taskModel
      .find(queryOptions)
      .skip(skippedTasks)
      .limit(limit)
      .exec();
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task | null> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    return updatedTask;
  }

  async deleteTask(id: string): Promise<CreateTaskDto> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    return deletedTask;
  }
}
