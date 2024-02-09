import Button from '@/UI/Button/Button';
import { Input } from '@/UI/Input/Input';
import { HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';
import common_styles from '../../common/Common.module.css';
import EmailIcon from '@/icons/email.svg';
import PasswordIcon from '@/icons/password.svg';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm } from '../../types/login-form.interface';
import { registerOptionsEmail, registerOptionsPassword } from '../../constants/validate-login.options';
import { useAuthStore } from '@/modules/Auth/store/auth.store';

type LoginFormProps = HTMLAttributes<HTMLFormElement>;

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
	const { register, handleSubmit, formState: { errors }, reset: cleanForm } = useForm<ILoginForm>();
	const { isSuccess, isLoading, login, access_token, errorMessage, reset } = useAuthStore();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<ILoginForm> = (data: ILoginForm) => {
		login(data);
	};

	useEffect(() => {
		reset();
		if(access_token) {
			cleanForm();
			navigate('/', { replace: true });
		}
	}, [isSuccess, access_token, cleanForm, navigate, reset]);



	return (
		<form className={cn(className, common_styles.form)} onSubmit={handleSubmit(onSubmit)} {...props}>

			<div className={common_styles.header}>Войти</div>
			{errorMessage && <div className={common_styles.errorMessage}>{errorMessage}</div>}
			<div className={common_styles.inputs}>
				<Input 
					icon={<EmailIcon/>} 
					labelName='E-mail' 
					placeholder='Введите email' 
					autoComplete='email'
					aria-invalid={!!errors.email}
					error={errors.email}
					{...register('email', registerOptionsEmail)} 
					autoFocus
				/>
				<Input 
					icon={<PasswordIcon/>} 
					type='password'
					autoComplete='current-password'
					labelName='Пароль' 
					placeholder='Введите пароль' 
					aria-invalid={!!errors.password}
					error={errors.password}
					{...register('password', registerOptionsPassword)}
				/>
			</div>

			<Button isLoading={isLoading}> Войти </Button>
			<span className={common_styles.footer}>Еще нет аккаунта? <Link to={'/auth/register'}>Зарегистрируйтесь!</Link></span>
		</form>
	);
};