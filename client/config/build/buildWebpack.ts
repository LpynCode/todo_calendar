import { Configuration } from 'webpack';
import 'webpack-dev-server';
import { IBuildOptions } from './types/types';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResovers';

export function buildWebpack(options: IBuildOptions): Configuration {
	const isDev = options.mode == 'development';
	return {
		mode: options.mode,
		entry: options.paths.entry,
		output: {
			path: options.paths.otput,
			filename: '[name].[contenthash:8].js',
			clean: true,
			publicPath: '/'
		},
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),
		devServer: isDev ? buildDevServer(options) : undefined,
		plugins: buildPlugins(options),
	};
}