import { getDate, getMonth, getDay, subDays, getYear, getHours, getMinutes } from 'date-fns';
import { MONTHS } from 'src/constants/months.constants';
import { WEEK_DAYS } from 'src/constants/weeks.constants';
import { IDateTime } from 'src/interfaces/date-time.interface';
import { IDate } from 'src/interfaces/date.interface';

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
