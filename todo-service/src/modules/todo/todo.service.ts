import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createTodo(createTodoDto: CreateTodoDto, userId: string) {
    const todo = await this.prisma.todo.create({
      data: {
        ...createTodoDto,
        userId,
      },
    });

    this.logger.log(`Todo created by user ${userId}: ${todo.id}`);
    return todo;
  }

  async getUserTodos(userId: string, completed?: boolean) {
    const filter: any = { userId };
    if (completed !== undefined) {
      filter.completed = completed;
    }

    const todos = await this.prisma.todo.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });

    return todos;
  }

  async getTodoById(id: string, userId: string, userRole: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    // Authorization: users can only see their own todos, admins can see all
    if (todo.userId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only view your own todos');
    }

    return todo;
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto, userId: string, userRole: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    // Authorization
    if (todo.userId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own todos');
    }

    const updatedTodo = await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });

    this.logger.log(`Todo updated: ${id}`);
    return updatedTodo;
  }

  async deleteTodo(id: string, userId: string, userRole: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    // Authorization
    if (todo.userId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own todos');
    }

    await this.prisma.todo.delete({
      where: { id },
    });

    this.logger.log(`Todo deleted: ${id}`);
    return { message: 'Todo deleted successfully' };
  }

  // Admin methods
  async getAllTodos() {
    const todos = await this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return todos;
  }

  async adminDeleteTodo(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    await this.prisma.todo.delete({
      where: { id },
    });

    this.logger.log(`Admin deleted todo: ${id}`);
    return { message: 'Todo deleted successfully' };
  }
}
