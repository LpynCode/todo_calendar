import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { ToDosService } from './todos.service';
import { User } from 'src/decorators/user.decorator';
import { IDisplayUser } from 'src/users/interfaces/display-user.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';

@Controller('todos')
export class ToDosController {
	constructor(private readonly todosService: ToDosService) {}

	@UseGuards(AuthGuard)
	@Post('create')
	async createTodo(@User() user: IDisplayUser, @Body() createDto: CreateTodoDto) {
		return this.todosService.createTodo({ ...createDto, userId: user.id });
	}

	@UseGuards(AuthGuard)
	@Get('/byDates/:dateStart/:dateEnd')
	async getToDosBetweenDates(
		@User() user: IDisplayUser,
		@Param('dateStart', ParseDatePipe) dateStart: Date,
		@Param('dateEnd', ParseDatePipe) dateEnd: Date,
	) {
		return this.todosService.getBetweenDates(user.id, dateStart, dateEnd);
	}
}
