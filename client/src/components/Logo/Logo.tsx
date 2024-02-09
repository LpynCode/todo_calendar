import { Link, LinkProps } from 'react-router-dom';
import LogoIcon from '@/icons/logo.svg';
import styles from './Logo.module.css';
import cn from 'classnames';

type LogoProps = Omit<LinkProps, 'to'>;

export const Logo = ({ className, ...props }: LogoProps) => {
	return (
		<Link to={'/'} className={cn(className, styles.logo)} {...props}>
			<LogoIcon className={styles.image}/>
			<span className={styles.title}>ToDo</span>
		</Link>
	);
};