import { Configuration } from 'webpack-dev-server';
import { IBuildOptions } from './types/types';

export function buildDevServer({ port }: IBuildOptions): Configuration {
	return {
		port: port ?? 3000,
		open: true,
		historyApiFallback: true
	};
}