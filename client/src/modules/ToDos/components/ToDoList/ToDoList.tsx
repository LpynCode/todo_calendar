import styles from './ToDoList.module.css';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import { useToDosStore } from '@/modules/ToDos/store/todos.store';
import { EmptyDayInfo } from '@/modules/ToDos/components/EmptyDayInfo/EmptyDayInfo';

export const ToDoList = () => {
	const { todosOnSelectedDay } = useToDosStore();

	if(todosOnSelectedDay.length === 0) {
		return <EmptyDayInfo/>;
	}

	return (
		<div className={styles.list}>
			{todosOnSelectedDay.map((el) => <ToDoItem key={el.id} item={el}/>)}
		</div>
	);
};