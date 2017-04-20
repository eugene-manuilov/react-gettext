import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import renderer from 'react-test-renderer';

import Textdomain from '../lib/index';

const SALT = '7[|UyK-%T`CKw-%j $1/6XTzdd(8+cY,/JCngNVv+wQO6NAv:+^=4GA[,+G@^GI<';

class App extends Component {
	render() {
		return <C1 {...this.props} />;
	}
};

class C1 extends Component {
	render() {
		return <span>{this.context.gettext(this.props.text)}</span>;
	}
};

C1.contextTypes = {
	gettext: PropTypes.func.isRequired,
	xgettext: PropTypes.func.isRequired,
	ngettext: PropTypes.func.isRequired
};

test('Child component has context functions', () => {
	const po = {};
	const sentence = faker.lorem.sentence();

	po[sentence] = SALT;

	const hoc = Textdomain(po, 'n!=1')(App);
	const component = renderer.create(React.createElement(hoc, {text: sentence}, []));

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});