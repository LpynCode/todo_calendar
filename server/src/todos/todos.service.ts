import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { reformatToDo } from 'src/helpers/reformatToDo';

@Injectable()
export class ToDosService {
	constructor(private readonly prismaService: PrismaService) {}

	async createTodo(data: CreateTodoDto) {
		return this.prismaService.toDoModel.create({ data: { ...data } });
	}

	async getBetweenDates(userId: number, dateStart: Date, dateEnd: Date) {
		const toDoModels = await this.prismaService.toDoModel.findMany({
			where: {
				userId,
				OR: [
					{ startTime: { gte: dateStart, lte: dateEnd } },
					{ endTime: { gte: dateStart, lte: dateEnd } },
				],
			},
			orderBy: { startTime: 'asc' },
		});
		return toDoModels.map((todo) => reformatToDo(todo));
	}
}
