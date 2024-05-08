import Button from '@/UI/Button/Button';
import { Input } from '@/UI/Input/Input';
import { HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';
import EmailIcon from '@/icons/email.svg';
import PasswordIcon from '@/icons/password.svg';
import { Link, useNavigate } from 'react-router-dom';
import common_styles from '../../common/Common.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegisterForm } from '../../types/register-form.interface';
import {
	registerOptionsEmail,
	registerOptionsPassword,
	registerOptionsConfirmPassword,
} from '../../constants/validate-register.options';
import { useAuthStore } from '@/modules/Auth/store/auth.store';

type RegisterFormProps = HTMLAttributes<HTMLFormElement>;

export const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
	const {
		handleSubmit,
		register: registerField,
		watch,
		formState: { errors },
	} = useForm<IRegisterForm>();
	const { register, isSuccess, isLoading, errorMessage, reset, access_token } = useAuthStore();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<IRegisterForm> = ({ email, password }: IRegisterForm) => {
		register({ email, password });
	};

	useEffect(() => {
		if (access_token) {
			navigate('/', { replace: true });
		}
	}, [access_token, navigate]);

	useEffect(() => {
		reset();
		if (isSuccess) {
			navigate('/auth/login', { replace: true });
		}
	}, [isSuccess, navigate, reset]);
	return (
		<form
			className={cn(className, common_styles.form)}
			onSubmit={handleSubmit(onSubmit)}
			{...props}
		>
			<div className={common_styles.header}>Регистрация</div>
			{errorMessage && <div className={common_styles.errorMessage}>{errorMessage}</div>}
			<div className={common_styles.inputs}>
				<Input
					icon={<EmailIcon />}
					labelName="E-mail"
					placeholder="Введите email"
					aria-invalid={!!errors.email}
					error={errors.email}
					{...registerField('email', registerOptionsEmail)}
					autoFocus
				/>
				<Input
					icon={<PasswordIcon />}
					type="password"
					labelName="Пароль"
					placeholder="Введите пароль"
					aria-invalid={!!errors.password}
					error={errors.password}
					{...registerField('password', registerOptionsPassword)}
				/>
				<Input
					icon={<PasswordIcon />}
					type="password"
					labelName="Подтверждение пароля"
					placeholder="Повторите пароль"
					aria-invalid={!!errors.confirmPassword}
					error={errors.confirmPassword}
					{...registerField('confirmPassword', registerOptionsConfirmPassword(watch))}
				/>
			</div>
			<Button isLoading={isLoading}> Зарегистрироваться </Button>
			<span className={common_styles.footer}>
				Уже зарегистрированны? <Link to={'/auth/login'}>Войдите!</Link>
			</span>
		</form>
	);
};
