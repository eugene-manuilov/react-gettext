import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
	<div className="top-bar">
		<div className="top-bar-left">
			<ul className="dropdown menu">
				<li className="menu-text">
					Poedit Example
				</li>
				<li>
					<Link to="/en">English</Link>
				</li>
				<li>
					<Link to="/fr">French</Link>
				</li>
				<li>
					<Link to="/de">German</Link>
				</li>
			</ul>
		</div>
	</div>
);

export default Menu;
