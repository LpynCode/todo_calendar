import { IDate } from '@/interfaces/date.interface';
import { getTodayDate } from '@/modules/CalendarWorkspace/helpers/today';

export const isEarlierToday = (day: IDate) => {
	const today = getTodayDate();
	return new Date(today.year, today.month.number - 1, today.day).getTime() > new Date(day.year, day.month.number - 1, day.day).getTime();
};