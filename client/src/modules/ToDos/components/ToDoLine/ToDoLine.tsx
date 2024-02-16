import styles from './ToDoLine.module.css';
import { ToDoLineItem } from '../ToDoLineItem/ToDoLineItem';
import { ToDoLineProps } from './ToDoLine.props';
import { useToDosStore } from '../../store/todos.store';
import { v4 } from 'uuid';
import { DragEvent, useRef } from 'react';
import { useDraggableToDoStore } from '@/modules/ToDos/store/draggable-todo.store';

export const ToDoLine = ({ index, ...props }: ToDoLineProps) => {

	const { todosTable } = useToDosStore();
	const { 
		todo, 
		todosTable: draggableToDosTable,
		startMouseX, 
		startRowIndex, 
		rowDiff, 
		columnDiff, 
		setRowDiff, setColumnDiff, reset 
	} = useDraggableToDoStore();

	const ref = useRef<HTMLDivElement>(null);

	const onDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if(ref && todo) {
			const columnWidth = e.currentTarget.clientWidth / 7;
			const tableLeftOffset = e.currentTarget.parentElement.offsetLeft;
			const newColumnIndex = Math.floor((e.clientX - tableLeftOffset) / columnWidth);
			const startColumnIndex = Math.floor((startMouseX - tableLeftOffset) / columnWidth);
			const newRowIndex = index;

			const newColumnDiff = newColumnIndex - startColumnIndex;
			if(newColumnDiff != columnDiff) {
				setColumnDiff(newColumnDiff);
			}
			const newRowDiff = newRowIndex - startRowIndex;
			if(newRowDiff != rowDiff) {
				setRowDiff(newRowDiff);
			}

		}
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		reset();
	};
	
	return (
		<div 
			className={styles.line} 
			onDragOver={onDragOver}
			onDrop={onDrop}
			ref={ref}
			{...props}
		>
			{
				todosTable[index] && todosTable[index].map(el => 
					<ToDoLineItem rowIndex={index} key={v4()} item={el}/>
				)
			}

			{draggableToDosTable[index] && <ToDoLineItem
				className={styles.draggable_item} 
				rowIndex={index} key={v4()} item={draggableToDosTable[index]}
			/>}
		</div>
	);
};