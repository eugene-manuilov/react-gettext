import React, { Component } from 'react';
import faker from 'faker';

import Textdomain from '../lib/index';

const getComponent = () => class extends Component {
	render() {
		return null;
	}
};

test('Default values when translations not found', () => {
	const baseComponent = getComponent();
	const hoc = Textdomain({}, '')(baseComponent);

	let sentence = '';

	sentence = faker.lorem.sentence();
	expect(hoc.gettext(sentence)).toBe(sentence);

	sentence = faker.lorem.sentence();
	expect(hoc.xgettext(sentence, 'context')).toBe(sentence);

	const sentence1 = faker.lorem.sentence();
	const sentence2 = faker.lorem.sentence();
	const number = faker.random.number({min: 1, max: 3});
	const expected = number > 1 ? sentence2 : sentence1;
	expect(hoc.ngettext(sentence1, sentence2, number)).toBe(expected);
});

test('Test gettext function', () => {
	const sentence = faker.lorem.sentence();
	const translation = faker.lorem.sentence();

	const po = {};
	po[sentence] = translation;

	const baseComponent = getComponent();
	const hoc = Textdomain(po, '')(baseComponent);

	expect(hoc.gettext(sentence)).toBe(translation);
});

test('Test xgettext function', () => {
	const sentence = faker.lorem.sentence();
	const context = faker.lorem.sentence();
	const translation = faker.lorem.sentence();

	const po = {};
	po[`${context}\u0004${sentence}`] = translation;

	const baseComponent = getComponent();
	const hoc = Textdomain(po, '')(baseComponent);

	expect(hoc.xgettext(sentence, context)).toBe(translation);
	expect(hoc.xgettext(sentence, faker.lorem.sentence())).not.toBe(translation);
});

test('Test ngettext function', () => {
	const sentence = faker.lorem.sentence();
	const translation1 = faker.lorem.sentence();
	const translation2 = faker.lorem.sentence();
	const translation3 = faker.lorem.sentence();

	const po = {};
	po[sentence] = [translation1, translation2, translation3];

	const baseComponent = getComponent();
	const hoc = Textdomain(po, 'n % 3 == 2 ? 2 : n % 2 == 1 ? 1 : 0')(baseComponent);

	const n = faker.random.number();
	const translation = po[sentence][n % 3 == 2 ? 2 : n % 2 == 1 ? 1 : 0];
	expect(hoc.ngettext(sentence, faker.lorem.sentence(), n)).toBe(translation);
});

test('Function callbacks for translations and plural forms', () => {
	const sentence1 = faker.lorem.sentence();
	const sentence2 = faker.lorem.sentence();
	const context = faker.lorem.sentence();

	const sentence3 = faker.lorem.sentence();
	const translation1 = faker.lorem.sentence();
	const translation2 = faker.lorem.sentence();
	const translation3 = faker.lorem.sentence();

	const getPO = () => {
		const po = {};

		po[sentence1] = translation1;
		po[`${context}\u0004${sentence2}`] = translation2;
		po[sentence3] = [translation1, translation2, translation3];

		return po;
	};

	const pluralForm = n => n % 3 == 2 ? 2 : n % 2 == 1 ? 1 : 0;

	const baseComponent = getComponent();
	const hoc = Textdomain(getPO, pluralForm)(baseComponent);

	expect(hoc.gettext(sentence1)).toBe(translation1);
	expect(hoc.xgettext(sentence2, context)).toBe(translation2);

	const n = faker.random.number();
	const translation = getPO()[sentence3][n % 3 == 2 ? 2 : n % 2 == 1 ? 1 : 0];
	expect(hoc.ngettext(sentence3, faker.lorem.sentence(), n)).toBe(translation);
})