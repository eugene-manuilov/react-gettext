const path = require( 'path' );

const config = {};

// mode
config.mode = 'production' === process.env.NODE_ENV ? 'production' : 'development';
config.devtool = false;

// entry and context
config.context = path.resolve( __dirname, 'src' );
config.entry = './index.js';

// output
config.output = {
	path: path.resolve( __dirname, 'dist' ),
	library: "ReactGettext",
	libraryTarget: 'umd'
};

// define externals
config.externals = {
	'react': 'React',
	'prop-types': 'PropTypes',
	'hoist-non-react-statics': 'hoistNonReactStatic',
};

// define rules
config.module = {
	rules: [
		{
			test: /\.js$/,
			enforce: 'pre',
			exclude: /node_modules|dist|lib/,
			use: [
				{
					loader: 'eslint-loader',
					options: {
						failOnWarning: false,
						failOnError: true
					}
				}
			]
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					]
				}
			}
		},
	],
};

module.exports = config;
