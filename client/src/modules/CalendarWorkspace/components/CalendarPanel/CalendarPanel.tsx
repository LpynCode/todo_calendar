import Button from '@/UI/Button/Button';
import styles from './CalendarPanel.module.css';
import { MonthsListBox } from '../MonthsListBox/MonthsListBox';
import { useCalendarStore } from '../../store/calendar.store';
import { useToDosPopusStore } from '@/modules/ToDos';

export const CalendarPanel = () => {
	const { setToday } = useCalendarStore();
	const {
		calendar: { month, year },
		fetchCalendar,
	} = useCalendarStore();

	const { setOpenToCreate } = useToDosPopusStore();

	const onTodayClick = () => {
		setToday();
	};

	const onClickIncrement = () => {
		fetchCalendar(month.number, year);
	};

	const onClickDecrement = () => {
		fetchCalendar(month.number - 2, year);
	};
	return (
		<div className={styles.panel}>
			<div className={styles.main}>
				<Button onClick={onTodayClick}>Сегодня</Button>
				<div className={styles.up_down_btns}>
					<Button onClick={onClickDecrement} arrowPosition={'up'} />
					<Button onClick={onClickIncrement} arrowPosition={'down'} />
				</div>
				<MonthsListBox />
			</div>
			<Button onClick={() => setOpenToCreate(true)}>Создать задачу</Button>
		</div>
	);
};
