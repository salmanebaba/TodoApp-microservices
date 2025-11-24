import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() createTodoDto: CreateTodoDto, @User() user: any) {
    return this.todoService.createTodo(createTodoDto, user.id);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getUserTodos(@User() user: any, @Query('completed') completed?: string) {
    // If user is admin, return all todos
    if (user.role === 'ADMIN') {
      return this.todoService.getAllTodos();
    }
    // Otherwise return only user's todos
    return this.todoService.getUserTodos(user.id, completed === 'true');
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getTodoById(@Param('id') id: string, @User() user: any) {
    return this.todoService.getTodoById(id, user.id, user.role);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @User() user: any,
  ) {
    return this.todoService.updateTodo(id, updateTodoDto, user.id, user.role);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTodo(@Param('id') id: string, @User() user: any) {
    return this.todoService.deleteTodo(id, user.id, user.role);
  }

  // Admin endpoints
  @Get('admin/all')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Delete('admin/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  async adminDeleteTodo(@Param('id') id: string) {
    return this.todoService.adminDeleteTodo(id);
  }
}
