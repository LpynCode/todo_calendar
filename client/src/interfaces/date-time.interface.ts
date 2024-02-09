import { IDate } from '@/interfaces/date.interface';


export interface IDateTime extends IDate {
    hours: number;
    minutes: number;
}