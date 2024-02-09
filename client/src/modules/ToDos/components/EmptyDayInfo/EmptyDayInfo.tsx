import BaloonImage from '@/icons/baloon.svg';
import styles from './EmptyDayInfo.module.css';

export const EmptyDayInfo = () => {
	return (
		<div className={styles.container}>
			<BaloonImage className={styles.baloon_image}/>
			<span className={styles.main_message}>На этот день ничего не запланировано!</span>
			<span >Удачной работы!</span>
		</div>
	);
};