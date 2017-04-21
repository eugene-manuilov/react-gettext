import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import renderer from 'react-test-renderer';

import Textdomain from '../lib/index';

class App extends Component {
	render() {
		return <C1 {...this.props} />;
	}
};

class C1 extends Component {
	render() {
		return (
			<ul>
				<li>
					<h1>gettext:</h1>
					<span>{this.context.gettext(this.props.gettext)}</span>
				</li>
				<li>
					<h1>xgettext:</h1>
					<span>{this.context.xgettext(this.props.xgettext, this.props.context)}</span>
				</li>
				<li>
					<h1>ngettext:</h1>
					<span>{this.context.ngettext(this.props.singular, this.props.plural, this.props.num)}</span>
				</li>
			</ul>
		);
	}
};

C1.contextTypes = {
	gettext: PropTypes.func.isRequired,
	xgettext: PropTypes.func.isRequired,
	ngettext: PropTypes.func.isRequired
};

test('Child component can use context functions', () => {
	const po = {};
	const sentence1 = faker.lorem.sentence();
	const sentence2 = faker.lorem.sentence();
	const sentence3 = faker.lorem.sentence();
	const sentence4 = faker.lorem.sentence();
	const sentence5 = faker.lorem.sentence();

	po[sentence1] = '7[|UyK-%T`CKw-%j $1/6XTzdd(8+cY,/JCngNVv+wQO6NAv:+^=4GA[,+G@^GI<';
	po[`${sentence3}\u0004${sentence2}`] = 'T6%(h7m%J*O(Bm6!FiRk0 9;V]r`kPz-ROW7E8*t.Aki9}j=hU9xfU8X|.7wEuZ0';
	po[sentence4] = [
		'ZgcaUXD7<qhRY#>A~@-`y2%xm@t{TLsN1LvUL`6zamv|e}G|rY`ms-|aMxn#_2f{',
		'v.,rfN>-w1>j#KBX%eRO[nm@|MgGv,8E.o8-|`t.9Sz{9n#k=+V?W.#k@/tjWq|>'
	];

	const hoc = Textdomain(po, 'n!=1')(App);
	const component = renderer.create(React.createElement(hoc, {
		gettext: sentence1,
		xgettext: sentence2,
		context: sentence3,
		singular: sentence4,
		plural: sentence5,
		num: 2
	}, []));

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});