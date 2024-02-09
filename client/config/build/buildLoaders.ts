import { ModuleOptions } from 'webpack';
import { IBuildOptions } from './types/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders({ mode }: IBuildOptions): ModuleOptions['rules'] {
	const isDev = mode === 'development';

	const cssLoader = {
		test: /\.css$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			'css-loader'
		],
	};
	const svgLoader = {
		test: /\.svg$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: { icon: true }
			},
		],
	};
	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};
	return [
		cssLoader,
		svgLoader,
		tsLoader,
	];
}