import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import faker from 'faker';

import withGettext from '../lib/index';

describe('Higher-order-component translates', () => {
	const pluralForm = 'n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2';
	const catalog = {};

	const gettext1 = faker.lorem.sentence();
	const gettext2 = faker.lorem.sentence();
	catalog[gettext1] = faker.lorem.sentence();

	const single1 = faker.lorem.sentence();
	const plural1 = faker.lorem.sentence();
	catalog[single1] = [
		faker.lorem.sentence(),
		faker.lorem.sentence(),
		faker.lorem.sentence(),
	];

	const single2 = faker.lorem.sentence();
	const plural2 = faker.lorem.sentence();

	const context1 = faker.lorem.sentence();
	const gettext3 = faker.lorem.sentence();
	const contextKey1 = `${context1}\u0004${gettext3}`;
	catalog[contextKey1] = faker.lorem.sentence();

	const context2 = faker.lorem.sentence();
	const gettext4 = faker.lorem.sentence();

	const single3 = faker.lorem.sentence();
	const plural3 = faker.lorem.sentence();
	const context3 = faker.lorem.sentence();
	const contextKey2 = `${context3}\u0004${single3}`;
	catalog[contextKey2] = [
		faker.lorem.sentence(),
		faker.lorem.sentence(),
		faker.lorem.sentence(),
	];

	const single4 = faker.lorem.sentence();
	const plural4 = faker.lorem.sentence();
	const context4 = faker.lorem.sentence();

	class baseComponent extends Component {
		render() {
			const { type, num } = this.props;

			let message = '';
			switch (type) {
				case 'gettext1':
					message = this.context.gettext(gettext1);
					break;
				case 'gettext2':
					message = this.context.gettext(gettext2);
					break;
				case 'ngettext1':
					message = this.context.ngettext(single1, plural1, num);
					break;
				case 'ngettext2':
					message = this.context.ngettext(single2, plural2, num);
					break;
				case 'xgettext1':
					message = this.context.xgettext(gettext3, context1);
					break;
				case 'xgettext2':
					message = this.context.xgettext(gettext4, context2);
					break;
				case 'nxgettext1':
					message = this.context.nxgettext(single3, plural3, num, context3);
					break;
				case 'nxgettext2':
					message = this.context.nxgettext(single4, plural4, num, context4);
					break;
			}

			return <div>{message}</div>;
		}
	};

	baseComponent.contextTypes = {
		gettext: PropTypes.func.isRequired,
		xgettext: PropTypes.func.isRequired,
		ngettext: PropTypes.func.isRequired,
		nxgettext: PropTypes.func.isRequired,
	};

	const Textdomain = withGettext(catalog, pluralForm)(baseComponent);

	test('gettext', () => {
		let wrapper;

		// check when translation exists
		wrapper = mount(<Textdomain type="gettext1" />);
		expect(wrapper.text()).toBe(catalog[gettext1]);

		// check when translation exists
		wrapper = mount(<Textdomain type="gettext2" />);
		expect(wrapper.text()).toBe(gettext2);
	});

	test('ngettext', () => {
		let wrapper;

		// check when translation exists
		for (let i = 0; i < 3; i++) {
			wrapper = mount(<Textdomain type="ngettext1" num={i == 0 ? 1 : (i == 1 ? 2 : 5)} />);
			expect(wrapper.text()).toBe(catalog[single1][i]);
		}

		// check fallbacks when a translation doesn't exist
		for (let i = 0; i < 2; i++) {
			wrapper = mount(<Textdomain type="ngettext2" num={i + 1} />);
			expect(wrapper.text()).toBe(i == 0 ? single2 : plural2);
		}
	});

	test('xgettext', () => {
		let wrapper;

		// check when translation exists
		wrapper = mount(<Textdomain type="xgettext1" />);
		expect(wrapper.text()).toBe(catalog[contextKey1]);

		// check when translation exists
		wrapper = mount(<Textdomain type="xgettext2" />);
		expect(wrapper.text()).toBe(gettext4);
	});

	test('ngettext', () => {
		let wrapper;

		// check when translation exists
		for (let i = 0; i < 3; i++) {
			wrapper = mount(<Textdomain type="nxgettext1" num={i == 0 ? 1 : (i == 1 ? 2 : 5)} />);
			expect(wrapper.text()).toBe(catalog[contextKey2][i]);
		}

		// check fallbacks when a translation doesn't exist
		for (let i = 0; i < 2; i++) {
			wrapper = mount(<Textdomain type="nxgettext2" num={i + 1} />);
			expect(wrapper.text()).toBe(i == 0 ? single4 : plural4);
		}
	});
});
