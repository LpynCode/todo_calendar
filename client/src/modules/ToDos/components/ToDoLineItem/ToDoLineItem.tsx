import { ToDoLineItemProps } from '@/modules/ToDos/components/ToDoLineItem/ToDoLineItem.props';
import styles from './ToDoLineItem.module.css';
import cn from 'classnames';
import { CALENDAR_ITEM_HEIGHT } from '@/modules/ToDos/constants/todo-calendar-item-height';
import { addZeroFormatter } from '@/helpers/add-zero-formatter';


export const ToDoLineItem = (
	{ item: { length, leftIndex, topIndex, todo, rescheduledLeft, rescheduleRight }, ...props }: ToDoLineItemProps ) => {

	const onClick = () => {
		console.log('hello');
	};
	return (
		<div 
			onClick={onClick}
			className={
				cn(
					styles.item,
					{ 
						[styles.rescheduled_left]: rescheduledLeft,
						[styles.reschedule_right]: rescheduleRight,
					}
				)
			} 
			style={
				{ 
					left: `calc(100% / 7 * ${leftIndex} + ${!rescheduledLeft ? '2px' : '0px'})`, 
					top: `${CALENDAR_ITEM_HEIGHT*topIndex + topIndex*2}px`, 
					width: `
					calc(
						100% / 7 * ${length} - 
						${!rescheduledLeft ? '2px': '0px'} - 
						${!rescheduleRight ? '2px' : '0px'}
					)` ,
					height: `${CALENDAR_ITEM_HEIGHT}px`
				}
			} 
			{...props}
		>
			{rescheduledLeft && 
			<span className={styles.rescheduled_interval_start}>
				с {addZeroFormatter(todo.startTime.day)}.{addZeroFormatter(todo.startTime.month.number)}
			</span>}

			<span>{todo.name}</span>

			{rescheduleRight && 
			<span className={styles.rescheduled_interval_end}>
				до {addZeroFormatter(todo.endTime.day)}.{addZeroFormatter(todo.endTime.month.number)}
			</span>}
		</div>
	);
};