import { WEEK_DAYS } from '@/constants/week.days';
import WeekDayItem from '../WeekDayItem/WeekDayItem';
import styles from './Calendar.module.css';
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { useCalendarStore } from '../../store/calendar.store';
import { v4 } from 'uuid';
import { CalendarLine } from '../CalendarLine/CalendarLine';
import { useToDosStore } from '@/modules/ToDos/store/todos.store';

type CalendarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Calendar = (props: CalendarProps) => {
	const { calendar } = useCalendarStore();
	const { fetchToDos } = useToDosStore();

	useEffect(() => {
		fetchToDos();
	}, [calendar.items, calendar.month, calendar.year, fetchToDos]);

	return(
		<div className={styles.calendar} {...props}>
			<div className={styles.week_days}>
				{WEEK_DAYS.map((el) => <WeekDayItem key={el.number} day={el}/>)}
			</div>
			<div className={styles.table}>
				{calendar.items.map((line, index) => <CalendarLine index={index} key={v4()}  line={line}/>)}
			</div>
		</div>
	);
};
