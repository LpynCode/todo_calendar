import { generateCommonDate } from '@/helpers/generate-common-date';
import { generateDateTime } from '@/helpers/generateDate';
import { IToDo } from '@/interfaces/todo.interface';
import { useCalendarStore } from '@/modules/CalendarWorkspace/store/calendar.store';
import { getDraggableToDoRows } from '@/modules/ToDos/helpers/todo-table';
import { IToDoCalendarItem } from '@/modules/ToDos/types/todo-calendar.interface';
import { addDays, addWeeks } from 'date-fns';
import { create } from 'zustand';


interface DraggableToDoState {
    todo: IToDo;
	todosTable: IToDoCalendarItem[];

    startMouseX: number;
	startRowIndex: number;

	rowDiff: number;
	columnDiff: number;

    todoRows: IToDoCalendarItem[];
    setToDo: (todo: IToDo, startRowIndex: number, startMouseX: number) => void;
	setRowDiff: (rowDiff: number) => void;
	setColumnDiff: (columnDiff: number) => void;

	reset: () => void;
}

export const useDraggableToDoStore = create<DraggableToDoState>((set, get) => ({
	todo: null,
	todosTable: [],
	todoRows: [],

	startMouseX: 0,
	startRowIndex: 0,

	rowDiff: 0,
	columnDiff: 0,

	setToDo: (todo: IToDo, startRowIndex: number, startMouseX: number) => {
		const { calendarInterval } = useCalendarStore.getState();
		set({ todo, todosTable: getDraggableToDoRows(todo, calendarInterval), startRowIndex, startMouseX });
	},
	setRowDiff: (rowDiff: number) => {
		const { todo, rowDiff: lastRowDiff } = get();
		const { calendarInterval } = useCalendarStore.getState();

		const newStartTime = generateDateTime(addWeeks(generateCommonDate(todo.startTime), rowDiff - lastRowDiff));
		const newEndTime = generateDateTime(addWeeks(generateCommonDate(todo.endTime), rowDiff - lastRowDiff));

		set({ 
			rowDiff, 
			todo: { ...todo, startTime: newStartTime, endTime: newEndTime }, 
			todosTable: getDraggableToDoRows({ ...todo, startTime: newStartTime, endTime: newEndTime }, calendarInterval) 
		});
	},
	setColumnDiff: (columnDiff: number) => {
		const { todo, columnDiff: lastColumnDiff } = get();
		const { calendarInterval } = useCalendarStore.getState();

		const newStartTime = generateDateTime(addDays(generateCommonDate(todo.startTime), columnDiff - lastColumnDiff));
		const newEndTime = generateDateTime(addDays(generateCommonDate(todo.endTime), columnDiff - lastColumnDiff));
		
		set({ 
			columnDiff, 
			todo: { ...todo, startTime: newStartTime, endTime: newEndTime }, 
			todosTable: getDraggableToDoRows({ ...todo, startTime: newStartTime, endTime: newEndTime }, calendarInterval) 
		});
	},
	reset: () => {
		set({ startMouseX: 0, startRowIndex: 0, rowDiff: 0, columnDiff: 0 });
	}
}));