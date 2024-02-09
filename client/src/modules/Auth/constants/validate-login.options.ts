import { RegisterOptions } from 'react-hook-form';


export const registerOptionsEmail: RegisterOptions = {
	required: { value: true, message: 'Поле обязательно для заполнения' }
};

export const registerOptionsPassword: RegisterOptions = {
	required: { value: true, message: 'Поле обязательно для заполнения' },
};