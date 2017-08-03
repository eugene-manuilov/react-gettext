import React, { Component } from 'react';

import Menu from './components/Menu';
import Page from './components/Page';

class Application extends Component {

	componentDidMount() {
	}

	render() {
		return (
			<div>
				<Menu />
				<Page />
			</div>
		);
	}

}

export default Application;
