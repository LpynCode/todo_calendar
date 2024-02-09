import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '@/main.css';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { AuthLayout } from '@/layout/Auth/AuthLayout';
import { RegisterPage } from '@/pages/RegisterPage/RegisterPage';
import { RequireAuth } from '@/modules/Auth';
import { MainLayout } from '@/layout/Main/MainLayout';
import { MainPage } from '@/pages/MainPage/MainPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><MainLayout/></RequireAuth>,
		children: [
			{
				path: '',
				element: <MainPage/>
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <LoginPage/>
			},
			{
				path: 'register',
				element: <RegisterPage/>
			}
		]
	}
]);

const root = document.getElementById('root');
const container = createRoot(root);

container.render(<RouterProvider router={router}/>);