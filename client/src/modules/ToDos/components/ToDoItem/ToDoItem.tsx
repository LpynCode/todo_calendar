import { ToDoItemProps } from '@/modules/ToDos/components/ToDoItem/ToDoItem.props';
import styles from './ToDoItem.module.css';
import { timeDiff } from '../../helpers/time-diff';
import { addZeroFormatter } from '@/helpers/add-zero-formatter';

export const ToDoItem = ({ item, ...props }: ToDoItemProps) => {
	return (
		<div className={styles.item} {...props}>
			<div className={styles.border_left}></div>
			<div className={styles.times}>
				<span className={styles.main_time}>
					{`${addZeroFormatter(item.startTime.hours)}:${addZeroFormatter(item.startTime.minutes)}`}
				</span>
				<span className={styles.duration}>{timeDiff(item.startTime, item.endTime)}</span>
			</div>
			<span className={styles.name}>{item.name}</span>
		</div>
	);
};
