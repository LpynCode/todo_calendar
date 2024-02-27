import { useAuthStore } from '@/modules/Auth/store/auth.store';
import { AxiosError } from 'axios';

export const handleError = (error: AxiosError) => {
	if (error?.response?.status === 401) {
		useAuthStore.getState().logout();
	}
};
