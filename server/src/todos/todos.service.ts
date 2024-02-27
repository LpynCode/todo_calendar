import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToDoDto } from './dtos/create-todo.dto';
import { reformatToDo } from 'src/helpers/reformatToDo';
import { UpdateToDoDto } from 'src/todos/dtos/update-todo.dto';

@Injectable()
export class ToDosService {
	constructor(private readonly prismaService: PrismaService) {}

	async createToDo(data: CreateToDoDto) {
		return this.prismaService.toDoModel.create({ data: { ...data } });
	}

	async updateToDo({ id, userId, ...data }: UpdateToDoDto) {
		const toDoModel = await this.prismaService.toDoModel.update({
			where: { id, userId },
			data,
		});
		return reformatToDo(toDoModel);
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
