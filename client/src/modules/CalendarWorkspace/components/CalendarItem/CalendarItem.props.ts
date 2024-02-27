import { IDate } from '@/interfaces/date.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CalendarItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	item: IDate;
}
