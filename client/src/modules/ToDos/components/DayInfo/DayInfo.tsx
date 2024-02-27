import styles from './DayInfo.module.css';
import { WEEK_DAYS } from '@/constants/week.days';
import { MONTHS } from '@/constants/months.constants';
import { addZeroFormatter } from '../../../../helpers/add-zero-formatter';
import { ToDoList } from '@/modules/ToDos';
import { useCalendarStore } from '@/modules/CalendarWorkspace/store/calendar.store';
import { useEffect } from 'react';
import { useToDosStore } from '../../store/todos.store';

export const DayInfo = () => {
	const { selectedDay } = useCalendarStore();
	const { setTodosOnSelectedDay } = useToDosStore();

	useEffect(() => {
		setTodosOnSelectedDay(selectedDay);
	}, [selectedDay, setTodosOnSelectedDay]);

	return <div className={styles.container}>
		<div className={styles.header}>
			{WEEK_DAYS[selectedDay.weekDay.number-1].shortName}, 
			{addZeroFormatter(selectedDay.day)} {MONTHS[selectedDay.month.number-1].shortName}
		</div>
		<ToDoList/>
	</div>;
};