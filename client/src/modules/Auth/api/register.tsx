import $api from '@/api';
import { IRegisterRequest } from '@/modules/Auth/types/register-request.interface';


export const register = async (data: IRegisterRequest) => {
	return await $api.post('/auth/register', data);
};