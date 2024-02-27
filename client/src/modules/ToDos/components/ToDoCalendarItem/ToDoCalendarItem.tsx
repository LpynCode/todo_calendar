import { ToDoCalendarItemProps } from '@/modules/ToDos/components/ToDoCalendarItem/ToDoCalendarItem.props';
import cn from 'classnames';
import styles from './ToDoCalendarItem.module.css';
import { CALENDAR_ITEM_HEIGHT } from '@/modules/ToDos/constants/todo-calendar-item-height';
import { addZeroFormatter } from '@/helpers/add-zero-formatter';

export const ToDoCalendarItem = ({
	item: { length, leftIndex, topIndex, todo, rescheduledLeft, rescheduleRight },
	className,
	...props
}: ToDoCalendarItemProps) => {
	return (
		<div
			className={cn(className, styles.item, {
				[styles.rescheduled_left]: rescheduledLeft,
				[styles.reschedule_right]: rescheduleRight,
			})}
			style={{
				left: `calc(100% / 7 * ${leftIndex} + ${!rescheduledLeft ? '2px' : '0px'})`,
				top: `${CALENDAR_ITEM_HEIGHT * topIndex + topIndex * 2}px`,
				width: `
            calc(
                100% / 7 * ${length} - 
                ${!rescheduledLeft ? '2px' : '0px'} - 
                ${!rescheduleRight ? '2px' : '0px'}
            )`,
				height: `${CALENDAR_ITEM_HEIGHT}px`,
			}}
			{...props}
		>
			{rescheduledLeft && (
				<span className={styles.rescheduled_interval_start}>
					с {addZeroFormatter(todo.startTime.day)}.{addZeroFormatter(todo.startTime.month.number)}
				</span>
			)}

			<span>{todo.name}</span>

			{rescheduleRight && (
				<span className={styles.rescheduled_interval_end}>
					до {addZeroFormatter(todo.endTime.day)}.{addZeroFormatter(todo.endTime.month.number)}
				</span>
			)}
		</div>
	);
};
