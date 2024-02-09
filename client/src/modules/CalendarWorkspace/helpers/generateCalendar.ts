import { IDate } from '@/interfaces/date.interface';
import { generateDate } from '../helpers/generateDate';
import { getDay, getDaysInMonth } from 'date-fns';

export const generateCalendarDays = (monthIndex: number, year: number): Array<Array<IDate>> => {
	const countDays = getDaysInMonth(new Date(year, monthIndex, 1));
	const days: Array<Array<IDate>> = [];
    
	const firstWeekDay = getDay(new Date(year, monthIndex, 0)) + 1;
	
	let line: IDate[] = [];
	let date: IDate;
	
	for (let i = firstWeekDay - 1; i > 0; i--) {
		const dayNumber = getDaysInMonth(new Date(year, monthIndex - 1, 1)) - i;
		date = generateDate(dayNumber + 1, monthIndex - 1, year);
		line.push(date);
	}
    
	for (let i = 0; i < countDays; i++) {
		date = generateDate(i + 1, monthIndex, year);
		line.push(date);
		if(date.weekDay.number == 7) {
			days.push(line);
			line = [];
		}
	}
    
	let i = date.weekDay.number;
	let k = 0;
	while (i < 7) {
		date = generateDate(k + 1, monthIndex + 1, year);
		line.push(date);
		k++;
		i++;
	}
	if(line.length == 7) days.push(line);

	return days;
};
