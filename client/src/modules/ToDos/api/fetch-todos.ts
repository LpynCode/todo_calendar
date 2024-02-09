import $api from '@/api';


export const fetchToDos = async (dateStart: string, dateEnd: string) => {
	const { data } = await $api.get(`/todos/byDates/${dateStart}/${dateEnd}`);
	return data;
};