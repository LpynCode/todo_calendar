import { IDateTime } from '@/interfaces/date-time.interface';
import { IDate } from '@/interfaces/date.interface';


export const endOfDay = (date: IDate): IDateTime => {
	return { ...date, hours: 23, minutes: 59 };
};