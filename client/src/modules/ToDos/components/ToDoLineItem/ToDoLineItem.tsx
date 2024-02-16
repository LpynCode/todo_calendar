import { ToDoLineItemProps } from './ToDoLineItem.props';
import styles from './ToDoLineItem.module.css';
import cn from 'classnames';
import { CALENDAR_ITEM_HEIGHT } from '../../constants/todo-calendar-item-height';
import { addZeroFormatter } from '@/helpers/add-zero-formatter';
import { DragEvent, useState } from 'react';
import { useDraggableToDoStore } from '@/modules/ToDos/store/draggable-todo.store';

export const ToDoLineItem = (
	{ 
		item: { length, leftIndex, topIndex, todo, rescheduledLeft, rescheduleRight }, 
		rowIndex,
		className,
		...props 
	}: ToDoLineItemProps 
) => {

	const { setToDo } = useDraggableToDoStore();
	const [isDragged, setIsDragged ] = useState<boolean>(false);

	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		const el = document.createElement('div');
		el.style.display = 'none';
		e.dataTransfer.setDragImage(el, 0, 0);
	};

	const onDrag = (e: DragEvent<HTMLDivElement>) => {
		setToDo(todo, rowIndex, e.clientX);
		setIsDragged(true);
	};


	return (
		<div 
			draggable={true}
			onDragStart={onDragStart}
			onDrag={onDrag}
			className={
				cn(
					className,
					styles.item,
					{ 
						[styles.isDragged]: isDragged,
						[styles.rescheduled_left]: rescheduledLeft,
						[styles.reschedule_right]: rescheduleRight,
					},
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