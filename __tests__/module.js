import withGettext, { Textdomain, TextdomainContext, buildTextdomain } from '../lib';

import withGettext2 from '../lib/withGettext';
import Textdomain2 from '../lib/Textdomain';
import TextdomainContext2 from '../lib/TextdomainContext';
import buildTextdomain2 from '../lib/buildTextdomain';

describe('Module exports', () => {
	test('withGettext (by default)', () => {
		expect(typeof withGettext).toBe('function');
		expect(withGettext).toEqual(withGettext2);
	});

	test('Textdomain', () => {
		expect(typeof Textdomain).toBe('function');
		expect(Textdomain).toEqual(Textdomain2);
	});

	test('TextdomainContext', () => {
		expect(typeof TextdomainContext).toBe('object');
		expect(TextdomainContext).toEqual(TextdomainContext2);
	});

	test('buildTextdomain', () => {
		expect(typeof buildTextdomain).toBe('function');
		expect(buildTextdomain).toEqual(buildTextdomain2);
	});
});
