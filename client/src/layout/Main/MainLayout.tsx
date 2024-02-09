import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Header } from './Header/Header';

export const MainLayout = () => {
	return (
		<>
			<div className={styles.header}>
				<Header/>
			</div>
			<div className={styles.content}>
				<Outlet/>
			</div>
		</>
	);
};