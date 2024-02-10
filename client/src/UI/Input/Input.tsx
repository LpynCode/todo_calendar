import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';


export const Input = forwardRef((
	{ icon, error, labelName, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>
) => {

	return (
		<div className={cn(className, styles.inputWrapper)}>
			<span className={styles.icon}>
				{icon}
			</span>
			<label className={styles.label}>{labelName}</label>
			<input 
				className={ 
					cn(
						styles.input,
						{ [styles.isError]: error }
					)
				} 
				ref={ref} 
				{...props}
			/>
			{error && <span role='alert' className={styles.error}>{error.message}</span>}
		</div>
	);
});