import { CalendarPanel } from '../CalendarPanel/CalendarPanel';
import { Calendar } from '../Calendar/Calendar';
import styles from './CalendarWorkspace.module.css';


export const CalendarWorkspace = () => {
	return (
		<div className={styles.workspace}>
			<CalendarPanel/>
			<Calendar/>
		</div>
	);
};