import styles from './ToDoLine.module.css';
import { ToDoLineProps } from './ToDoLine.props';
import { useToDosStore } from '../../store/todos.store';
import { v4 } from 'uuid';
import { useDraggableToDoStore } from '../../store/draggable-todo.store';
import { DragEvent, MouseEvent, useRef, useState } from 'react';
import { DraggableToDoCalendarItem } from '../DraggableToDoCalendarItem/DraggableToDoCalendarItem';
import { DraggingToDoCalendarItem } from '../DraggingToDoCalendarItem/DraggingToDoCalendarItem';
import { useCalendarStore } from '@/modules/CalendarWorkspace';
import { useToDosPopusStore } from '@/modules/ToDos/store/todos-popups.store';

export const ToDoLine = ({ index, ...props }: ToDoLineProps) => {
	const { todosTable, updateToDo } = useToDosStore();
	const { setSelectedDayByIndexes } = useCalendarStore();
	const { setOpenToCreate } = useToDosPopusStore();
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

	const [clickTimerId, setClickTimerId] = useState(null);
	const ref = useRef<HTMLDivElement>(null);

	const getColumnIndex = (mouseX: number) => {
		if (!ref) return;
		const columnWidth = ref.current.clientWidth / 7;
		const tableLeftOffset = ref.current.parentElement.offsetLeft;
		return Math.floor((mouseX - tableLeftOffset) / columnWidth);
	};

	const onDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (isHidden) setIsHidden(false);
		if (draggableToDo) {
			const newColumnIndex = getColumnIndex(e.clientX);
			const startColumnIndex = getColumnIndex(startMouseX);
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

	const onClick = (e: MouseEvent<HTMLDivElement>) => {
		if (!clickTimerId) {
			setClickTimerId(
				setTimeout(() => {
					onOnesClick(e);
				}, 200),
			);
		} else {
			onOnesClick(e);
			onDoubleClick();
		}
	};

	const onOnesClick = (e: MouseEvent<HTMLDivElement>) => {
		const columnIndex = getColumnIndex(e.clientX);
		setSelectedDayByIndexes(index, columnIndex);

		setClickTimerId(clearTimeout(clickTimerId));
	};

	const onDoubleClick = () => {
		/* const columnIndex = getColumnIndex(e.clientX, e); */
		setOpenToCreate(true);

		setClickTimerId(clearTimeout(clickTimerId));
	};

	const onDragLeave = () => {
		setIsHidden(true);
	};

	const onDragEnter = () => {
		setIsHidden(false);
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		updateToDo(draggableToDo);
		reset();
	};

	return (
		<div
			onDrop={onDrop}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			onClick={onClick}
			className={styles.line}
			ref={ref}
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
