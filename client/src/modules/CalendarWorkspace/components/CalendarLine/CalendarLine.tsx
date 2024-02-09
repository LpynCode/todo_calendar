import { CalendarLineProps } from '@/modules/CalendarWorkspace/components/CalendarLine/CalendarLine.props';
import cn from 'classnames';
import styles from './CalendarLine.module.css';
import { CalendarItem } from '@/modules/CalendarWorkspace/components/CalendarItem/CalendarItem';
import { v4 } from 'uuid';
import { ToDoLine } from '@/modules/ToDos/components/ToDoLine/ToDoLine';

export const CalendarLine = ({ line, index, className, ...props }: CalendarLineProps) => {
	return (
		<div className={cn(className, styles.line)} {...props}>
			{line.map((item) => <CalendarItem key={v4()} item={item}/>)}
			<ToDoLine key={index} index={index}/>
		</div>
	);
};