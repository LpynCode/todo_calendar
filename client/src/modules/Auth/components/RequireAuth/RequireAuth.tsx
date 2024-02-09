import { ReactNode } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';


export const RequireAuth = ({ children }: {children: ReactNode}) => {
	const { access_token } = useAuthStore();

	return access_token ? children : <Navigate to={'/auth/login'} replace/>;
};