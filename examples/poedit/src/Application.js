import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Menu from './components/Menu';
import Page from './components/Page';

class Application extends Component {

	static renderPage(route) {
		const { language } = route.match.params;

		let pofile = {
			catalog: {},
			plural: 'n != 1',
		};

		try {
			pofile = require(`./languages/LC_MESSAGES/${language}.mo.json`);
		} catch (e) {
			// do nothing, default pofile will be used
		}

		return <Page translations={pofile.catalog} plural={pofile.plural} />;
	}

	render() {
		return (
			<div>
				<Menu />
				<Switch>
					<Route path="/:language" render={Application.renderPage} />
					<Redirect from="/" to="/en" />
				</Switch>
			</div>
		);
	}

}

export default withRouter(Application);
