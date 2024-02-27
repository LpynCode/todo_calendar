import { DraggableToDoCalendarItemProps } from './DraggableToDoCalendarItem.props';
import { DragEvent } from 'react';
import { useDraggableToDoStore } from '../../store/draggable-todo.store';
import { ToDoCalendarItem } from '../ToDoCalendarItem/ToDoCalendarItem';
import styles from './DraggableToDoCalendarItem.module.css';
import cn from 'classnames';

export const DraggableToDoCalendarItem = ({
	item,
	rowIndex,
	...props
}: DraggableToDoCalendarItemProps) => {
	const { setToDo, todo: draggableToDo, reset, isHidden } = useDraggableToDoStore();

	const onMouseDown = (e: DragEvent<HTMLDivElement>) => {
		setToDo(item.todo, rowIndex, e.clientX);
	};

	const onMouseUp = () => {
		reset();
	};

	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		const el = document.createElement('div');
		el.style.display = 'none';
		e.dataTransfer.setDragImage(el, 0, 0);
	};

	return (
		<ToDoCalendarItem
			draggable={true}
			onMouseDown={onMouseDown}
			onDragStart={onDragStart}
			onMouseUp={onMouseUp}
			item={item}
			className={cn({
				[styles.disabled]: !!draggableToDo && !isHidden,
			})}
			{...props}
		/>
	);
};
