import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ToDoLineProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    index: number;
}