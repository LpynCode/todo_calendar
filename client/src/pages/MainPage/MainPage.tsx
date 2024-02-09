import { CalendarWorkspace } from '@/modules/CalendarWorkspace';
import styles from './MainPage.module.css';
import { DayInfo } from '@/modules/ToDos';

export const MainPage = () => {
	return (
		<div className={styles.main}>
			<CalendarWorkspace/>
			<DayInfo/>
		</div>
	);
};