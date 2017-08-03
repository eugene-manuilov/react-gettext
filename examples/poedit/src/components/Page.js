import React from 'react';
import withGettext from 'react-gettext';

const Page = () => (
	<div className="grid-container">
		<div className="grid-x">
			<div className="cell small-12">
				<p>text</p>
			</div>
		</div>
	</div>
);

export default withGettext()(Page);
