import { IRegisterForm } from '@/modules/Auth/types/register-form.interface';
import { RegisterOptions, UseFormWatch } from 'react-hook-form';


export const registerOptionsEmail: RegisterOptions = {
	required: { value: true, message: 'Поле обязательно для заполнения' },
	pattern: {
		value: /\S+@\S+\.\S+/,
		message: 'Неверный формат email'
	}
};

export const registerOptionsPassword: RegisterOptions = {
	required: { value: true, message: 'Поле обязательно для заполнения' },
	maxLength: { value: 30, message: 'Пароль должень быть меньше 30 символов' },
	minLength: { value: 6, message: 'Пароль должень быть больше 6 символов' }
};

export const registerOptionsConfirmPassword = (watch: UseFormWatch<IRegisterForm>):RegisterOptions => {
	return {
		required: { value: true, message: 'Поле обязательно для заполнения' },
		validate: (value: string) => {
			if (watch('password') !== value) {
				return 'Пароли не совпадают';
			}
		},
	};

};