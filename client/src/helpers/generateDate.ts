import { MONTHS } from '@/constants/months.constants';
import { WEEK_DAYS } from '@/constants/week.days';
import { IDate } from '@/interfaces/date.interface';
import { getDate, getDay, getMonth, getYear, subDays } from 'date-fns';

export const generateDate = (date: Date): IDate => {
	const day = getDate(date);
	const monthIndex = getMonth(date);
	const weekDayIndex = getDay(subDays(date, 1));
	const year = getYear(date);
	return { day, weekDay: WEEK_DAYS[weekDayIndex], month: MONTHS[monthIndex], year };
};