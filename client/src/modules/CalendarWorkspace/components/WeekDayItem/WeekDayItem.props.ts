import { IWeekDay } from '../../../../interfaces/week-day.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface WeekDayItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    day: IWeekDay;
}