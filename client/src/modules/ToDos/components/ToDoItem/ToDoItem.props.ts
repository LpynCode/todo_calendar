import { IToDo } from '@/interfaces/todo.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ToDoItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IToDo;
}