import { MONTHS } from '@/constants/months.constants';
import { WEEK_DAYS } from '@/constants/week.days';
import { IDate } from '@/interfaces/date.interface';
import { getDay } from 'date-fns';

export const generateDate = (day: number, monthIndex: number, year: number): IDate => {
	return { day, weekDay: WEEK_DAYS[getDay(new Date(year, monthIndex, day - 1))], month: MONTHS[monthIndex], year };
};