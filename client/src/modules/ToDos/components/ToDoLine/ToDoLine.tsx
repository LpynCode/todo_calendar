import styles from './ToDoLine.module.css';
import { ToDoLineItem } from '../ToDoLineItem/ToDoLineItem';
import { ToDoLineProps } from '@/modules/ToDos/components/ToDoLine/ToDoLine.props';
import { useToDosStore } from '@/modules/ToDos/store/todos.store';
import { v4 } from 'uuid';

export const ToDoLine = ({ index, ...props }: ToDoLineProps) => {

	const { todosTable } = useToDosStore();
	
	return (
		<div className={styles.line} {...props}>
			{todosTable[index] && todosTable[index].map(el => 
				<ToDoLineItem key={v4()} item={el}/>
			)}
		</div>
	);
};