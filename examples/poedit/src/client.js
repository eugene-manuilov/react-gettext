import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Application from './Application';

ReactDOM.render(
	(
		<BrowserRouter>
			<Application />
		</BrowserRouter>
	),
	document.getElementById('app'),
);
