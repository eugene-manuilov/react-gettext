import { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

import withGettext, { Textdomain } from '../lib/index';

describe('Higher-order-component', () => {
	class baseComponent extends Component {
		render() {
			return this.props.children;
		}
	};

	const name = faker.lorem.word();
	baseComponent.displayName = name;

	const plural = 'n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2';
	const Textdomain = withGettext({}, plural)(baseComponent);

	test('is React component', () => {
		expect(Component.isPrototypeOf(Textdomain)).toBeTruthy();
	});

	test('has proper displayName', () => {
		expect(Textdomain.displayName).toBe(`withGettext(${name})`);
	});

	test('has proper childContextType', () => {
		expect(Textdomain.childContextTypes).toEqual({
			gettext: PropTypes.func,
			ngettext: PropTypes.func,
			xgettext: PropTypes.func,
			nxgettext: PropTypes.func,
		});
	});

	test('properly calculates plural form', () => {
		const instance = new Textdomain({plural});
		expect(instance.getPluralForm(1)).toBe(0);
		expect(instance.getPluralForm(2)).toBe(1);
		expect(instance.getPluralForm(5)).toBe(2);
	});
});

describe('Textdomain', () => {
	test('named export', () => {
		expect(typeof Textdomain).toBe('function');
	});
});