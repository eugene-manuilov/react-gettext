const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack config
const config = {};

// devtools
config.devtool = 'source-map';

// entry and context
config.context = path.resolve(__dirname, 'src');
config.entry = {
	app: './client.js'
};

// output
config.output = {
	path: path.resolve(__dirname, 'build'),
	publicPath: '/',
	filename: 'js/[name].js',
	chunkFilename: '[id].js'
};

// define module object
config.module = {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					presets: [
						'@babel/preset-react',
						'@babel/preset-env',
					]
				}
			}
		},
		{
			test: /\.(jade|pug)$/,
			include: path.resolve(__dirname, 'src/html'),
			loader: 'pug-loader',
			query: {
				self: true,
			},
		},
	],
};

// define plugins array
config.plugins = [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'src/html/webpack.pug')
	}),
];

// dev server
config.devServer = {
	historyApiFallback: true,
	contentBase: path.resolve(__dirname, 'build')
};

module.exports = config;
