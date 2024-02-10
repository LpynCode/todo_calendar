import styles from './ToDoLine.module.css';
import { ToDoLineItem } from '../ToDoLineItem/ToDoLineItem';
import { ToDoLineProps } from '@/modules/ToDos/components/ToDoLine/ToDoLine.props';
import { useToDosStore } from '@/modules/ToDos/store/todos.store';
import { v4 } from 'uuid';
import { DragEvent, useRef } from 'react';

export const ToDoLine = ({ index, ...props }: ToDoLineProps) => {

	const { todosTable } = useToDosStore();
	const ref = useRef<HTMLDivElement>(null);

	const onDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if(ref) {
			const leftIndex = Math.floor((e.clientX - ref.current.parentElement.offsetLeft) * 7 / ref.current.clientWidth);
			console.log(leftIndex);
		}
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		console.log(e.target);
	};
	
	return (
		<div 
			className={styles.line} 
			onDragOver={onDragOver}
			onDrop={onDrop}
			ref={ref}
			{...props}
		>
			{todosTable[index] && todosTable[index].map(el => 
				<ToDoLineItem key={v4()} item={el}/>
			)}
		</div>
	);
};