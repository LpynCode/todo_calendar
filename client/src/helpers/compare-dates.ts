import { IDate } from '@/interfaces/date.interface';

export const compareDates = (date1: IDate, date2: IDate): boolean => {
	return (
		date1.day == date2.day && date1.month.number == date2.month.number && date1.year == date2.year
	);
};
