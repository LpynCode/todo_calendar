import axios from 'axios';

export const API_URL = 'http://localhost/api';

const $api = axios.create({
	baseURL: API_URL,
});

$api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');

		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

export default $api;
