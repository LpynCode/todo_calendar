import { IDateTime } from '@/interfaces/date-time.interface';


export interface IToDo {
    id: number;
    name: string | null;
    startTime: IDateTime;
    endTime: IDateTime;
}