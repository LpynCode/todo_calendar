import { Logo } from '@/components/Logo/Logo';
import styles from './Header.module.css';
import { UserInfo } from '@/modules/Auth';


export const Header = () => {
	return <div className={styles.header}>
		<Logo/>
		<UserInfo/>
	</div>;
};