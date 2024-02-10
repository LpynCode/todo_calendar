import { IDate } from '@/interfaces/date.interface';
import { generateDate } from '../../../helpers/generateDate';
import { 
	Interval,
	eachDayOfInterval, 
	eachWeekOfInterval, 
	endOfMonth, 
	isMonday, 
	isSunday, 
	nextSunday, 
	previousMonday, 
} from 'date-fns';

export const generateCalendarDays = (monthIndex: number, year: number): IDate[][] => {
	const range = getCalendarInterval(monthIndex, year);

	const lines = getCalendarLines(range);
	const calendar = [];
	for(const interval of lines) {
		calendar.push(eachDayOfInterval(interval).map((day) => generateDate(day)));
	}
	return calendar;
};

export const getCalendarInterval = (monthIndex: number, year: number): Interval<Date> => {
	const firstDay = new Date(year, monthIndex, 1);
	const lastDay = endOfMonth(new Date(year, monthIndex));

	const start = isMonday(firstDay) ? firstDay : previousMonday(firstDay);
	const end = isSunday(lastDay) ? lastDay : nextSunday(lastDay);
	return { start, end };
}; 

export const getCalendarLines = (interval: Interval<Date>): Interval<Date>[] => {
	return eachWeekOfInterval(interval).map((sunday) => ({ start: previousMonday(sunday), end: sunday })).splice(1);
};
