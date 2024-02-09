import { useAuthStore } from '@/modules/Auth/store/auth.store';
import Button from '@/UI/Button/Button';
import styles from './UserInfo.module.css';

export const UserInfo = () => {
	const { logout, user } = useAuthStore();

	const onClick = () => {
		logout();
	};

	return (
		<div className={styles.container}>
			<span className={styles.email}>{user.email}</span>
			<Button onClick={onClick}>Выйти</Button>
		</div>
	);
};