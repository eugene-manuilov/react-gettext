import { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

import withGettext from '../lib';

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
});
