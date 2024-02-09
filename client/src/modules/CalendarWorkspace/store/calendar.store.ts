import { getTodayDate } from '../helpers/today';
import { ICalendar } from '../types/calendar.interface';
import { create } from 'zustand';
import { validateMonthAndYear } from '../helpers/validateMonthAndYear';
import { generateDate } from '@/modules/CalendarWorkspace/helpers/generateDate';
import { IDate } from '@/interfaces/date.interface';
import { generateCalendarDays } from '@/modules/CalendarWorkspace/helpers/generateCalendar';
import { MONTHS } from '@/constants/months.constants';

interface CalendarState {
    calendar: ICalendar;
	selectedDay: IDate;
	setSelectedDay: (date: IDate) => void;
	setToday: () => void;
    fetchCalendar: (monthIndex: number, year:number) => void;
} 

const today = getTodayDate();

export const useCalendarStore = create<CalendarState>((set, get) => ({
	calendar: {
		month: today.month,
		year: today.year,
		items: generateCalendarDays(today.month.number - 1, today.year)
	},
	selectedDay: today,
	setSelectedDay: (date: IDate) => {
		set({ selectedDay: date });
	},
	setToday: () => {
		const todayDate = getTodayDate();
		if(today.month.number !== get().calendar.month.number || today.year !== get().calendar.year) {
			get().fetchCalendar(today.month.number - 1, today.year);
		}
		get().setSelectedDay(todayDate);
	},
	fetchCalendar: (monthIndex: number, year:number) => {
		const [monthValidated, yearValidated] = validateMonthAndYear(monthIndex, year);
		const data = generateCalendarDays(monthValidated, yearValidated);
		
		set({ 
			calendar: { month: MONTHS[monthValidated], year: yearValidated, items: data }, 
			selectedDay: generateDate(1, monthValidated, yearValidated) 
		});
	}
})); 