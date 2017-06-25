import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import faker from 'faker';

import withGettext from '../lib/index';

describe('Higher-order-component', () => {
	class baseComponent extends Component {
		render() {
			return (
				<div>

				</div>
			);
		}
	};

	const name = faker.lorem.word();
	baseComponent.displayName = name;

	const catalog = {
	};

	const Textdomain = withGettext(catalog, 'n != 1')(baseComponent);

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
