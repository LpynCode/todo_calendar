import { ToDoCalendarItem } from '@/modules/ToDos/components/ToDoCalendarItem/ToDoCalendarItem';
import { ToDoCalendarItemProps } from '@/modules/ToDos/components/ToDoCalendarItem/ToDoCalendarItem.props';
import styles from './DraggingToDoCalendarItem.module.css';
export const DraggingToDoCalendarItem = ({ item, ...props }: ToDoCalendarItemProps) => {
	return <ToDoCalendarItem className={styles.item} item={item} {...props} />;
};
