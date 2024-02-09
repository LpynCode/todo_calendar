import { IUser } from '@/interfaces/user.interface';
import { login } from '../api/login';
import { create } from 'zustand';
import { ILoginRequest } from '@/modules/Auth/types/login-request.interface';
import { register } from '../api/register';
import { IRegisterRequest } from '../types/register-request.interface';

interface IAuthState {
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    user: IUser;
    access_token: string;
	reset: () => void;
	logout: () => void;
    login: (data: ILoginRequest) => Promise<void>;
	register: (data: IRegisterRequest) => Promise<void>;
}

const user: IUser = JSON.parse(localStorage.getItem('user'));
const access_token: string = localStorage.getItem('access_token');

export const useAuthStore = create<IAuthState>((set) => ({
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	user,
	access_token,
	reset: () => {
		set({ isLoading: false, isSuccess: false, errorMessage: '' });
	},
	logout: () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
		set({ access_token: '', user: undefined });
	},
	login: async (requestData: ILoginRequest) => {
		set({ isLoading: true });
		try {
			const { data } = await login(requestData);
			localStorage.setItem('user', JSON.stringify(data.user));
			localStorage.setItem('access_token', data.access_token);
			set({ isSuccess: true, isLoading: false, user: data.user, access_token: data.access_token });
		} catch(error) {

			const httpError = error.response.data;
			set({ errorMessage: httpError.message, isLoading: false, isSuccess: false });
		}
		
	},
	register: async (requestData: IRegisterRequest) => {
		set({ isLoading: true });
		try {
			const { data } = await register(requestData);
			if(data) {
				set({ isSuccess: true, isLoading: false });
			}
		} catch(error) {
			const httpError = error.response.data;
			set({ errorMessage: httpError.message, isLoading: false, isSuccess: false });
		}
		
	}
}));