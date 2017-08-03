import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Menu from './components/Menu';
import Page from './components/Page';

class Application extends Component {

	static renderPage(route) {
		const { language } = route.match.params;

		console.log(language);

		return <Page />;
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
