import { MONTHS } from '@/constants/months.constants';
import { WEEK_DAYS } from '@/constants/week.days';
import { IDateTime } from '@/interfaces/date-time.interface';
import { IDate } from '@/interfaces/date.interface';
import { getDate, getDay, getHours, getMinutes, getMonth, getYear, subDays } from 'date-fns';

export const generateDate = (date: Date): IDate => {
	const day = getDate(date);
	const monthIndex = getMonth(date);
	const weekDayIndex = getDay(subDays(date, 1));
	const year = getYear(date);
	return { day, weekDay: WEEK_DAYS[weekDayIndex], month: MONTHS[monthIndex], year };
};

export const generateDateTime = (date: Date): IDateTime => {
	return { ...generateDate(date), hours: getHours(date), minutes: getMinutes(date) };
};
