import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { Logo } from '@/components/Logo/Logo';

export const AuthLayout = () => {
	return <div className={styles.layout}>
		<Logo className={styles.logo} tabIndex={-1}/>
		<div className={styles.form_wrapper}> 
			<div className={styles.content}>
				<Outlet/>
			</div>
		</div>
	</div>;
};