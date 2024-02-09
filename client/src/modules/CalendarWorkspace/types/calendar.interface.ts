import { IMonth } from '@/interfaces/month.interface';
import { IDate } from '@/interfaces/date.interface';

export interface ICalendar {
	month: IMonth;
	year: number;
	items: IDate[][];
}