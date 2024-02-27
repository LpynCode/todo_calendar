import { IToDo } from '@/interfaces/todo.interface';
import { fetchToDos } from '../api/fetch-todos';
import { create } from 'zustand';
import { handleError } from '@/helpers/handle-eroor';
import { IAsyncState } from '@/interfaces/async-state.interface';
import { getToDoTable } from '@/modules/ToDos/helpers/todo-table';
import { useCalendarStore } from '@/modules/CalendarWorkspace/store/calendar.store';
import { IToDoCalendarItem } from '@/modules/ToDos/types/todo-calendar.interface';
import { generateCommonDate } from '@/helpers/generate-common-date';
import { endOfDay, format, isWithinInterval, startOfDay } from 'date-fns';
import { IDate } from '@/interfaces/date.interface';

interface ToDosState extends IAsyncState {
	todos: IToDo[];
	todosOnSelectedDay: IToDo[];
	todosTable: IToDoCalendarItem[][];
	setTodosOnSelectedDay: (day: IDate) => void;
	fetchToDos: () => Promise<void>;
}

export const useToDosStore = create<ToDosState>((set, get) => ({
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	todos: [],
	todosOnSelectedDay: [],
	todosTable: [],
	setTodosOnSelectedDay: (day: IDate) => {
		set({
			todosOnSelectedDay: get().todos.filter(({ startTime, endTime }) =>
				isWithinInterval(generateCommonDate(day), {
					start: startOfDay(generateCommonDate(startTime)),
					end: endOfDay(generateCommonDate(endTime)),
				}),
			),
		});
	},
	fetchToDos: async () => {
		try {
			set({ isLoading: true });
			const {
				selectedDay,
				calendarInterval: { start, end },
			} = useCalendarStore.getState();
			const data = await fetchToDos(format(start, 'yyyy-LL-dd'), format(end, 'yyyy-LL-dd'));
			set({
				todos: data,
				todosTable: getToDoTable(data, { start, end }),
				isLoading: false,
				isSuccess: true,
			});
			get().setTodosOnSelectedDay(selectedDay);
		} catch (e) {
			set({ errorMessage: e.response });
			handleError(e);
		}
	},
}));
