import { CalendarItemProps } from './CalendarItem.props';
import styles from './CalendarItem.module.css';
import cn from 'classnames';
import { isEarlierToday } from '../../helpers/isEarlierToday';
import { compareDates } from '@/helpers/compareDates';
import { getTodayDate } from '../../helpers/today';
import { addZeroFormatter } from '@/helpers/add-zero-formatter';
import { useCalendarStore } from '../../store/calendar.store';

export const CalendarItem = ({ item, ...props }: CalendarItemProps) => {
	const { selectedDay, setSelectedDay } = useCalendarStore();

	const onClick = () => {
		setSelectedDay(item);
	};

	return (
		<div
			className={cn(styles.card, {
				[styles.selected]: compareDates(item, selectedDay),
				[styles.isEarlier]: isEarlierToday(item),
				[styles.isToday]: compareDates(item, getTodayDate()),
			})}
			onClick={onClick}
			{...props}
		>
			<div className={styles.title}>
				<span className={styles.dayHeader}>{addZeroFormatter(item.day)}</span>
				{item.day === 1 && (
					<span className={styles.monthHeader}>{item.month.name.toUpperCase()}</span>
				)}
			</div>
		</div>
	);
};
