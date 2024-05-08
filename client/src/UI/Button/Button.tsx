import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import Arrow from '@/icons/arrow.svg';
import { Loader } from '@/components/Loader/Loader';

const Button = ({ children, isLoading, arrowPosition, className, ...props }: ButtonProps) => {
	return (
		<button className={cn(className, styles.button)} {...{ disabled: isLoading }} {...props}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{children}
					{!!arrowPosition && (
						<Arrow
							className={cn(styles.arrow, { [styles.arrow_down]: arrowPosition === 'down' })}
						/>
					)}
				</>
			)}
		</button>
	);
};

export default Button;
