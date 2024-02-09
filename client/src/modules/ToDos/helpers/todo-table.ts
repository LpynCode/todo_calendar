import { generateCommonDate } from '@/helpers/generate-common-date';
import { IDate } from '@/interfaces/date.interface';
import { IToDo } from '@/interfaces/todo.interface';
import { IToDoCalendarItem } from '@/modules/ToDos/types/todo-calendar.interface';
import { 
	areIntervalsOverlapping,
	compareDesc, 
	differenceInCalendarDays, 
	endOfDay, 
	isWithinInterval, 
	startOfDay 
} from 'date-fns';


export const getToDoTable = (todos: IToDo[], calendar: IDate[][]): IToDoCalendarItem[][] => {
	const table: IToDoCalendarItem[][] = [];

	for(const row of calendar) {
		const start = generateCommonDate(row[0]);
		const end = generateCommonDate(row[6]);

		const line: IToDoCalendarItem[] = [];
		for(const todo of todos) {
			const commonStartTime = generateCommonDate(todo.startTime);
			const commonEndTime = generateCommonDate(todo.endTime);
			if(compareDesc(endOfDay(end), commonStartTime) > 0) break;

			const topIndex =  getTopIndexInLine(todo, line);

			if(isWithinInterval(commonStartTime, { start, end }))  {
				const startIndex = todo.startTime.weekDay.number - 1;
				const diff = differenceInCalendarDays(commonEndTime, commonStartTime);
				const rescheduleRight = diff + startIndex >= 7;
				const length =  rescheduleRight ? 7 - startIndex : diff + 1;  
				line.push({ 
					todo, 
					length, 
					topIndex, 
					leftIndex: startIndex,
					rescheduledLeft: false,
					rescheduleRight,
				});
			} else if(isWithinInterval(commonEndTime, { start, end })) {
				const length = todo.endTime.weekDay.number;
				line.push({ todo, 
					length, 
					topIndex, 
					leftIndex: 0, 
					rescheduledLeft: true,
					rescheduleRight: false
				});
			} else if(
				isWithinInterval(start, { start: commonStartTime, end: commonEndTime }) && 
				isWithinInterval(end, { start: commonStartTime, end: commonEndTime })
			) {
				line.push({ todo, 
					length: 7, 
					topIndex, 
					leftIndex: 0, 
					rescheduledLeft: true,
					rescheduleRight: true
				});
			}
		}

		table.push(line);
	}

	return table;
    
};

const getTopIndexInLine = ({ startTime, endTime }: IToDo, line: IToDoCalendarItem[]) => {
	let topIndex = 0;
	const start = startOfDay(generateCommonDate(startTime));
	const end = endOfDay(generateCommonDate(endTime));
	let maxIndex = 0;
	for( const { todo: checkToDo, topIndex: checkTopIndex } of line ) {
		const startCheck = generateCommonDate(checkToDo.startTime);
		const endCheck = generateCommonDate(checkToDo.endTime);
		maxIndex = Math.max(maxIndex, checkTopIndex);
		if(
			areIntervalsOverlapping(
				{ start, end }, 
				{ start: startCheck, end: endCheck }
			)  && topIndex == checkTopIndex
		) {
			topIndex++;
			if(topIndex == maxIndex) {
				topIndex++;
			}
		}
	}
	return topIndex;
}; 