import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Application from './Application';

ReactDOM.render(
	(
		<BrowserRouter>
			<Switch>
				<Route path="/:language" component={Application} />
				<Redirect from="/" to="/en" />
			</Switch>
		</BrowserRouter>
	),
	document.getElementById('app'),
);
