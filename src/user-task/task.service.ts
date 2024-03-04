import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument ,TaskStatus} from './model/task.model';
import { CreateTaskDto } from './Dto/task.dto';
import { UpdateTaskDto } from './Dto/updatetask.dto';
@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new this.taskModel(createTaskDto);
        return task.save();
    }

    async getTasks(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.taskModel.findById(id).exec();
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task | null> {
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
        return updatedTask;
    }

    async deleteTask(id: string): Promise<CreateTaskDto> {
        const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
        return deletedTask;
    }
}