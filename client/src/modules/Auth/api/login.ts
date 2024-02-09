import $api from '@/api';
import { ILoginRequest } from '@/modules/Auth/types/login-request.interface';

export const login = async (userData: ILoginRequest) => {
	try{
		const res = $api.post('/auth/login', userData); 
		return res;
	} catch(e) {
		console.log('Aaaaa', e);
	}
};