import React from 'react';
import PropTypes from 'prop-types';
import withGettext from 'react-gettext';

const Page = (props, context) => {
	const { gettext } = context;

	return (
		<div className="grid-container">
			<div className="grid-x">
				<div className="cell small-12">
					<h3>Gettext:</h3>
					<p>{gettext('I watched the storm, so beautiful yet terrific.')}</p>
				</div>
			</div>
		</div>
	);
};

Page.contextTypes = {
	gettext: PropTypes.func.isRequired,
};

export default withGettext()(Page);
