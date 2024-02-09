import path from 'path';
import { Configuration } from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { IBuildOptions, IBuildPaths } from './config/build/types/types';


interface EnvVariables {
    mode: 'production' | 'development';
    port: number;
}

export default ({ mode, port }: EnvVariables) => {
	const paths: IBuildPaths = {
		entry: path.resolve(__dirname, 'src', 'main.tsx'),
		otput: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src')
	};
	const options: IBuildOptions = {
		mode,
		port,
		paths
	};

	const config: Configuration = buildWebpack(options);

	return config;
};