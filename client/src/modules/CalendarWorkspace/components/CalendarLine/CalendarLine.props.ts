import { IDate } from '@/interfaces/date.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CalendarLineProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    line: Array<IDate>;
    index: number;
}