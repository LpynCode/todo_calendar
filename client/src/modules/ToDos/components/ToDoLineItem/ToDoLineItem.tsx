import { ToDoLineItemProps } from '@/modules/ToDos/components/ToDoLineItem/ToDoLineItem.props';
import styles from './ToDoLineItem.module.css';
import cn from 'classnames';
import { CALENDAR_ITEM_HEIGHT } from '@/modules/ToDos/constants/todo-calendar-item-height';
import { addZeroFormatter } from '@/helpers/add-zero-formatter';
import { DragEvent } from 'react';


export const ToDoLineItem = (
	{ item: { length, leftIndex, topIndex, todo, rescheduledLeft, rescheduleRight }, ...props }: ToDoLineItemProps ) => {

	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		const el = document.createElement('div');
		el.style.display = 'none';
		e.dataTransfer.setDragImage(el, 0, 0);
		e.dataTransfer.setData('text/plain', 'hello');
		console.log('start');
	};

	const onDragEnd = () => {
		console.log('end');
	};

	return (
		<div 
			draggable={true}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
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