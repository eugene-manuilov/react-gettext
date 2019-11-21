const BABEL_ENV = process.env.BABEL_ENV;
const targets = BABEL_ENV === 'test' ? { node: 6 } : { browsers: 'defaults' };

module.exports = {
	presets: [
		['@babel/preset-env', { targets } ],
		'@babel/preset-react',
	],
};
