import { WeekDayItemProps } from './WeekDayItem.props';
import styles from './WeekDayItem.module.css';

const WeekDayItem = ({ day, ...props }: WeekDayItemProps) => {
	return <div className={styles.item} {...props}>{day.name}</div>;
};

export default WeekDayItem;