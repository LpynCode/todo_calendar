import { IToDoCalendarItem } from '@/modules/ToDos/types/todo-calendar.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ToDoLineItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IToDoCalendarItem;
    rowIndex: number;
}