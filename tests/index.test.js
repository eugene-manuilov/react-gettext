import withGettext from '../lib/index';

test('Test default export', () => {
	expect(typeof withGettext).toBe('function');
});