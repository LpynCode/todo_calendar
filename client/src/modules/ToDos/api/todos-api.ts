import $api from '@/api';
import { generateCommonDate } from '@/helpers/generate-common-date';
import { IToDo } from '@/interfaces/todo.interface';

export const fetchToDos = async (dateStart: string, dateEnd: string) => {
	const { data } = await $api.get(`/todos/byDates/${dateStart}/${dateEnd}`);
	return data;
};

export const updateToDo = async (toDo: IToDo) => {
	const startTime = generateCommonDate(toDo.startTime);
	const endTime = generateCommonDate(toDo.endTime);
	const { data } = await $api.put('/todos/update', { ...toDo, startTime, endTime });
	return data;
};

export const createToDo = async (toDo: Omit<IToDo, 'id'>) => {
	const startTime = generateCommonDate(toDo.startTime);
	const endTime = generateCommonDate(toDo.endTime);
	const { data } = await $api.post('/todos/create', { ...toDo, startTime, endTime });
	return data;
};
