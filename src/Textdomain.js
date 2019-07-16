import { Component } from 'react';
import PropTypes from 'prop-types';

import {
	gettext,
	ngettext,
	xgettext,
	nxgettext,
} from './gettext';

class Textdomain extends Component {

	getChildContext() {
		const self = this;

		return {
			gettext: self.gettext.bind(self),
			xgettext: self.xgettext.bind(self),
			ngettext: self.ngettext.bind(self),
			nxgettext: self.nxgettext.bind(self),
		};
	}

	gettext(message) {
		const { translations } = this.props;
		return gettext(translations, message);
	}

	ngettext(singular, plural, n) {
		const { translations, plural: plurality } = this.props;
		return ngettext(translations, plurality, singular, plural, n);
	}

	xgettext(message, context) {
		const { translations } = this.props;
		return xgettext(translations, message, context);
	}

	nxgettext(singular, plural, n, context) {
		const { translations, plural: plurality } = this.props;
		return nxgettext(translations, plurality, singular, plural, n, context);
	}

	render() {
		const { children } = this.props;
		return children;
	}

}

Textdomain.propTypes = {
	translations: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.objectOf(PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
		])),
	]),
	plural: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
	]),
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

Textdomain.defaultProps = {
	translations: {},
	plural: 'n != 1',
	children: [],
};

Textdomain.childContextTypes = {
	gettext: PropTypes.func,
	ngettext: PropTypes.func,
	xgettext: PropTypes.func,
	nxgettext: PropTypes.func,
};

export default Textdomain;
