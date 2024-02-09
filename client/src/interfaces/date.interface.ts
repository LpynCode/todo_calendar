import { IMonth } from './month.interface';
import { IWeekDay } from './week-day.interface';

export interface IDate {
	day: number;
	weekDay: IWeekDay;
	month: IMonth;
	year: number;
}