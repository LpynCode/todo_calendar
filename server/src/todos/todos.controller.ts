import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateToDoDto } from './dtos/create-todo.dto';
import { ToDosService } from './todos.service';
import { User } from 'src/decorators/user.decorator';
import { IDisplayUser } from 'src/users/interfaces/display-user.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';
import { UpdateToDoDto } from 'src/todos/dtos/update-todo.dto';

@Controller('todos')
export class ToDosController {
	constructor(private readonly todosService: ToDosService) {}

	@UseGuards(AuthGuard)
	@Post('create')
	async createTodo(@User() user: IDisplayUser, @Body() createDto: CreateToDoDto) {
		return this.todosService.createToDo({ ...createDto, userId: user.id });
	}

	@UseGuards(AuthGuard)
	@Put('update')
	async updateTodo(@User() user: IDisplayUser, @Body() updateDto: UpdateToDoDto) {
		return this.todosService.updateToDo({ ...updateDto, userId: user.id });
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
