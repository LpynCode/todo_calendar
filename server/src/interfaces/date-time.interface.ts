import { IDate } from 'src/interfaces/date.interface';

export interface IDateTime extends IDate {
	hours: number;
	minutes: number;
}
