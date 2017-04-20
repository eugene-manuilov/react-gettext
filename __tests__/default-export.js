import Textdomain from '../lib/index';

test('Test default export', () => {
	expect(typeof Textdomain).toBe('function');
});

test('Test HOF returns HOC function', () => {
	expect(typeof Textdomain({}, '')).toBe('function');
});