import { IMonth } from './month.interface';
import { IWeekDay } from './week.interface';

export interface IDate {
	day: number;
	weekDay: IWeekDay;
	month: IMonth;
	year: number;
}
