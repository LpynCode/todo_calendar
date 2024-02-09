import { IDateTime } from '@/interfaces/date-time.interface';
import { IDate } from '@/interfaces/date.interface';


export const generateCommonDate = (date: IDate | IDateTime): Date => {
	return 'hours' in date ? 
		new Date( date.year, date.month.number - 1, date.day, date?.hours, date?.minutes) : 
		new Date( date.year, date.month.number - 1, date.day);
};