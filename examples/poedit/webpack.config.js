const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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

// externals
config.externals = {
	firebase: 'firebase'
};

// define module object
config.module = {
	rules: []
};

// eslint configuration
config.module.rules.push({
	test: /\.js$/,
	enforce: 'pre',
	exclude: /node_modules/,
	use: [
		{
			loader: 'eslint-loader',
			options: {
				failOnWarning: false,
				failOnError: true
			}
		}
	]
});

// babel loader rule
config.module.rules.push({
	test: /\.js$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			cacheDirectory: true,
			presets: [
				['react'],
				['env', {targets: {browsers: ["last 2 versions", "safari >= 7"]}}]
			]
		}
	}
});

// sass loader rule
config.module.rules.push({
	test: /\.scss$/,
	loaders: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: 'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
	}),
});

// pug loader rule
config.module.rules.push({
	test: /\.(jade|pug)$/,
	include: path.resolve(__dirname, 'src/html'),
	loader: 'pug-loader',
	query: {
		self: true,
	},
});

// define plugins array
config.plugins = [
	new webpack.NoEmitOnErrorsPlugin(),

	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'src/html/webpack.pug')
	}),

	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'js/vendor.js',
		minChunks(module, count) {
			var context = module.context;
			return context && context.indexOf('node_modules') >= 0;
		}
	}),

	new ExtractTextPlugin({
		filename: 'styles/[name].css',
		allChunks: true
	})
];

// dev server
config.devServer = {
	historyApiFallback: true,
	contentBase: path.resolve(__dirname, 'build')
};

module.exports = config;