import { ToDoModel } from '@prisma/client';
import { generateDateTime } from 'src/helpers/date-formatter.helper';
import { IToDo } from 'src/interfaces/todo.interface';

export const reformatToDo = (todoModel: ToDoModel): IToDo => {
	return {
		...todoModel,
		startTime: generateDateTime(todoModel.startTime),
		endTime: generateDateTime(todoModel.endTime),
	};
};
