import $api from '@/api';

export const fetchCalendar = async (monthIndex: number, year: number) => {
	const { data } = await $api.get(`/calendar/byMonth/${monthIndex}/${year}`);
	return data;
};