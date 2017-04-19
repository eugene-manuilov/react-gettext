import React, { Component, PropTypes } from 'react';
import faker from 'faker';

import Textdomain from '../lib/index';

const getComponent = () => class extends Component {
	render() {
		return React.Children.only(this.props.children);
	}
};

describe('Higher-order component', () => {
	const name = faker.lorem.word();

	const baseComponent = getComponent();
	baseComponent.displayName = name;

	const hoc = Textdomain({}, '')(baseComponent);

	test('is React Component', () => {
		expect(Component.isPrototypeOf(hoc)).toBeTruthy();
	});

	test('has proper display name', () => {
		expect(hoc.displayName).toBe(`WithGettext(${name})`);
	});

	test('has childContextTypes', () => {
		expect(hoc.childContextTypes).toEqual({
			gettext: PropTypes.func,
			ngettext: PropTypes.func,
			xgettext: PropTypes.func
		});
	});

	test('has static functions for context types', () => {
		expect(typeof hoc.gettext).toBe('function');
		expect(typeof hoc.ngettext).toBe('function');
		expect(typeof hoc.xgettext).toBe('function');
	});
});

describe('Higher-order component instance', () => {
	const baseComponent = getComponent();
	const hoc = Textdomain({}, '')(baseComponent);

	test('returns child context', () => {
		const hocObject = new hoc({});
		expect(hocObject.getChildContext()).toEqual({
			gettext: hoc.gettext,
			ngettext: hoc.ngettext,
			xgettext: hoc.xgettext
		});
	});
});