import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withGettext from 'react-gettext';

class Page extends Component {

	constructor(props) {
		super(props);

		this.state = {
			hours: 1,
			minutes: 1,
		};

		this.updateHours = this.updateHours.bind(this);
		this.updateMinutes = this.updateMinutes.bind(this);
	}

	updateHours(e) {
		this.setState({ hours: parseInt(e.target.value, 10) });
	}

	updateMinutes(e) {
		this.setState({ minutes: parseInt(e.target.value, 10) });
	}

	render() {
		const { hours, minutes } = this.state;
		const { gettext, xgettext, ngettext, nxgettext } = this.context;

		return (
			<div className="grid-container">
				<div className="grid-x">
					<div className="cell small-12">
						<dl>
							<dt>gettext:</dt>
							<dd>{gettext('I watched the storm, so beautiful yet terrific.')}</dd>

							<dt>xgettext:</dt>
							<dd>{xgettext('Almost before we knew it, we had left the ground.', 'A sample text from Google Fonts service')}</dd>

							<dt>ngettext:</dt>
							<dd>
								<input type="number" value={hours} min="1" max="12" onChange={this.updateHours} />
								<code>{hours} {ngettext('hour', 'hours', hours)}</code>
							</dd>

							<dt>nxgettext:</dt>
							<dd>
								<input type="number" value={minutes} min="0" max="59" onChange={this.updateMinutes} />
								<code>{minutes} {nxgettext('minute', 'minutes', minutes, 'Number of hours')}</code>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		);
	}

}

Page.contextTypes = {
	gettext: PropTypes.func.isRequired,
	xgettext: PropTypes.func.isRequired,
	ngettext: PropTypes.func.isRequired,
	nxgettext: PropTypes.func.isRequired,
};

export default withGettext()(Page);
