import { generateCommonDate } from '@/helpers/generate-common-date';
import { IToDo } from '@/interfaces/todo.interface';
import { getCalendarLines } from '@/modules/CalendarWorkspace/helpers/generateCalendar';
import { IToDoCalendarItem } from '@/modules/ToDos/types/todo-calendar.interface';
import { 
	Interval,
	areIntervalsOverlapping,
	compareDesc, 
	differenceInCalendarDays, 
	endOfDay, 
	isWithinInterval, 
	startOfDay 
} from 'date-fns';


export const getToDoTable = (todos: IToDo[], calendarInterval: Interval<Date>): IToDoCalendarItem[][] => {
	const table: IToDoCalendarItem[][] = [];

	const rows = getCalendarLines(calendarInterval);
	for(const row of rows) {
		table.push(getToDoLine(row, todos));
	}
	return table;
};

const getToDoLine = ({ start, end }: Interval<Date>, todos: IToDo[]): IToDoCalendarItem[] => {

	const line: IToDoCalendarItem[] = [];

	for(const todo of todos) {
		if(compareDesc(endOfDay(end), generateCommonDate(todo.startTime)) > 0) break;

		const topIndex =  getTopIndexInLine(todo, line);
		const todoItem = getToDoCalendarItem(todo, { start, end }, topIndex);
		if(todoItem) {
			line.push(todoItem);
		}
	}
	return line;
};

export const getToDoCalendarItem = (todo: IToDo, interval: Interval<Date>, topIndex: number): IToDoCalendarItem => {
	const commonStartTime = generateCommonDate(todo.startTime);
	const commonEndTime = generateCommonDate(todo.endTime);
		
	if(isWithinInterval(commonStartTime, interval))  {
		const startIndex = todo.startTime.weekDay.number - 1;
		const diff = differenceInCalendarDays(commonEndTime, commonStartTime);
		const rescheduleRight = diff + startIndex >= 7;
		const length =  rescheduleRight ? 7 - startIndex : diff + 1;  
		return { 
			todo, 
			length, 
			topIndex, 
			leftIndex: startIndex,
			rescheduledLeft: false,
			rescheduleRight,
		};
	} else if(isWithinInterval(commonEndTime, interval)) {
		const length = todo.endTime.weekDay.number;
		return { todo, 
			length, 
			topIndex, 
			leftIndex: 0, 
			rescheduledLeft: true,
			rescheduleRight: false
		};
	} else if(
		isWithinInterval(interval.start, { start: commonStartTime, end: commonEndTime }) && 
		isWithinInterval(interval.end, { start: commonStartTime, end: commonEndTime })
	) {
		return { todo, 
			length: 7, 
			topIndex, 
			leftIndex: 0, 
			rescheduledLeft: true,
			rescheduleRight: true
		};
	}
	return;
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