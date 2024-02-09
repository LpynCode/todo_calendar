import { IDateTime } from 'src/interfaces/date-time.interface';

export interface IToDo {
	id: number;
	name: string;
	startTime: IDateTime;
	endTime: IDateTime;
}
