import { getTodayDate } from '../helpers/today';
import { ICalendar } from '../types/calendar.interface';
import { create } from 'zustand';
import { validateMonthAndYear } from '../helpers/validateMonthAndYear';
import { generateDate } from '@/helpers/generateDate';
import { IDate } from '@/interfaces/date.interface';
import { generateCalendarDays, getCalendarInterval } from '@/modules/CalendarWorkspace/helpers/generateCalendar';
import { MONTHS } from '@/constants/months.constants';
import { Interval } from 'date-fns';

interface CalendarState {
    calendar: ICalendar;
	calendarInterval: Interval<Date>;
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
	calendarInterval: getCalendarInterval(today.month.number - 1, today.year),
	selectedDay: today,
	setSelectedDay: (date: IDate) => {
		set({ selectedDay: date });
	},
	setToday: () => {
		const todayDate = getTodayDate();
		const { calendar: { month, year }, setSelectedDay, fetchCalendar } = get();
		if(today.month.number !== month.number || today.year !== year) {
			fetchCalendar(today.month.number - 1, today.year);
		}
		setSelectedDay(todayDate);
	},
	fetchCalendar: (monthIndex: number, year:number) => {
		const [monthValidated, yearValidated] = validateMonthAndYear(monthIndex, year);
		const data = generateCalendarDays(monthValidated, yearValidated);
		
		set({ 
			calendar: { month: MONTHS[monthValidated], year: yearValidated, items: data }, 
			calendarInterval: getCalendarInterval(monthValidated, yearValidated),
			selectedDay: generateDate(new Date(yearValidated, monthValidated, 1)) 
		});
	}
})); 