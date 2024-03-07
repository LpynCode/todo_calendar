import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Header } from './Header/Header';
import { CreateToDoPopup } from '@/modules/ToDos/components/CreateToDoPopup/CreateToDoPopup';

export const MainLayout = () => {
	return (
		<>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.content}>
				<CreateToDoPopup />
				<Outlet />
			</div>
		</>
	);
};
