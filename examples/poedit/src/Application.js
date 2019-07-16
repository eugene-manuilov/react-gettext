import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextdomainContext, buildTextdomain } from '../../../src';

import Menu from './components/Menu';
import Page from './components/Page';

class Application extends Component {

	static getTextdomain({ match }) {
		const { params } = match || {};
		const { language } = params || {};

		let pofile = {
			catalog: {},
			plural: 'n != 1',
		};

		try {
			pofile = require(`./languages/LC_MESSAGES/${language}.mo.json`);
		} catch (e) {
			// do nothing, default pofile will be used
		}

		return buildTextdomain(pofile.catalog, pofile.plural);
	}

	constructor(props) {
		super(props);
		this.state = { textdomain: Application.getTextdomain(props) };
	}

	componentDidUpdate(prevProps) {
		const { match: prevMatch } = prevProps || {};
		const { params: prevParams } = prevMatch || {};
		const { language: prevLanguage } = prevParams || {};

		const { match: newMatch } = this.props;
		const { params: newParams } = newMatch || {};
		const { language: newLanguage } = newParams || {};

		if ( newLanguage !== prevLanguage ) {
			this.setState({ textdomain: Application.getTextdomain(this.props) });
		}
	}

	render() {
		return (
			<TextdomainContext.Provider value={this.state.textdomain}>
				<Menu />
				<Page />
			</TextdomainContext.Provider>
		);
	}

}

Application.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Application;
