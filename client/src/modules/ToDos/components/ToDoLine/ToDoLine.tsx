import styles from './ToDoLine.module.css';
import { ToDoLineProps } from './ToDoLine.props';
import { useToDosStore } from '../../store/todos.store';
import { v4 } from 'uuid';
import { useDraggableToDoStore } from '../../store/draggable-todo.store';
import { DragEvent } from 'react';
import { DraggableToDoCalendarItem } from '@/modules/ToDos/components/DraggableToDoCalendarItem/DraggableToDoCalendarItem';
import { DraggingToDoCalendarItem } from '@/modules/ToDos/components/DraggingToDoCalendarItem/DraggingToDoCalendarItem';

export const ToDoLine = ({ index, ...props }: ToDoLineProps) => {
	const { todosTable } = useToDosStore();
	const {
		todo: draggableToDo,
		todosTable: draggableToDosTable,
		reset,
		startMouseX,
		startRowIndex,
		rowDiff,
		columnDiff,
		setRowDiff,
		setColumnDiff,
		isHidden,
		setIsHidden,
	} = useDraggableToDoStore();

	const onDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		console.log('hello');
		if (draggableToDo) {
			const columnWidth = e.currentTarget.clientWidth / 7;
			const tableLeftOffset = e.currentTarget.parentElement.offsetLeft;
			const newColumnIndex = Math.floor((e.clientX - tableLeftOffset) / columnWidth);
			const startColumnIndex = Math.floor((startMouseX - tableLeftOffset) / columnWidth);
			const newRowIndex = index;

			const newColumnDiff = newColumnIndex - startColumnIndex;
			if (newColumnDiff != columnDiff) {
				setColumnDiff(newColumnDiff);
			}
			const newRowDiff = newRowIndex - startRowIndex;
			if (newRowDiff != rowDiff) {
				setRowDiff(newRowDiff);
			}
		}
	};

	const onDragLeave = () => {
		setIsHidden(true);
	};

	const onDragEnter = () => {
		setIsHidden(false);
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		reset();
	};

	return (
		<div
			onDrop={onDrop}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			className={styles.line}
			{...props}
		>
			{todosTable[index] &&
				todosTable[index].map((el) => (
					<DraggableToDoCalendarItem rowIndex={index} key={v4()} item={el} />
				))}

			{!isHidden && draggableToDosTable[index] && (
				<DraggingToDoCalendarItem key={v4()} item={draggableToDosTable[index]} />
			)}
		</div>
	);
};
