import { MONTHS } from '@/constants/months.constants';
import { WEEK_DAYS } from '@/constants/week.days';
import { IDate } from '@/interfaces/date.interface';
import { format } from 'date-fns';

export const getTodayDate = (): IDate => {
	const dateAsArray: Array<string> = format(new Date(), 'd.MM.yyyy.i').split('.');
	const day = Number(dateAsArray[0]);
	const monthIndex = Number(dateAsArray[1]) - 1;
	const weekDayIndex = Number(dateAsArray[3]) - 1;
	const year = Number(dateAsArray[2]);
	return {
		day,
		month: MONTHS[monthIndex],
		weekDay: WEEK_DAYS[weekDayIndex],
		year,
	};
};