const path = require('path');

const webpack = require('webpack');

const config = {};

// entry and context
config.context = path.resolve(__dirname, 'src');
config.entry = './index.js';

// output
config.output = {
	library: "ReactGettext",
	libraryTarget: 'umd'
};

// define externals
config.externals = {
	react: {
		root: 'React',
		commonjs2: 'react',
		commonjs: 'react',
		amd: 'react'
	},
	propTypes: {
		root: 'PropTypes'
	}
};

// define module and plugins
config.module = {rules: []};
config.plugins = [];

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
				['env', {targets: {browsers: ["last 2 versions", "safari >= 7"]}}],
				['react']
			]
		}
	}
});

// no emit plugin
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());

// uglify plugin
if ('production' === process.env.NODE_ENV) {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: true}));
}

module.exports = config;