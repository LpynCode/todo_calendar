import { IToDo } from '@/interfaces/todo.interface';

export interface IToDoCalendarItem {
    todo: IToDo;
    length: number;
    leftIndex: number;
    topIndex: number;
    rescheduledLeft: boolean;
    rescheduleRight: boolean;
}