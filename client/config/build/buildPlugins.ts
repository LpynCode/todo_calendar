import { Configuration, ProgressPlugin } from 'webpack';
import { IBuildOptions } from './types/types';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({ paths, mode }: IBuildOptions): Configuration['plugins'] {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({ template: paths.html })
	];

	if (isDev) {
		plugins.push(new ProgressPlugin());
	}

	if (isProd) {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash:8].css',
			chunkFilename: 'styles/[name].[contenthash:8].css',
		}));
	}

	return plugins;
}