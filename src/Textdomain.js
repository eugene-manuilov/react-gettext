import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Textdomain extends Component {

	getTranslations() {
		const { catalog } = this.props;

		return catalog;
	}

	getPluralForm() {
		const { plural } = this.props;

		return plural;
	}

	getDelimiter() {
		return '\u0004'; // End of Transmission (EOT)
	}

	gettext(message) {
		const messages = this.getTranslations();
		return messages.hasOwnProperty(message) ? messages[message] : message;
	}

	ngettext(singular, plural, n) {
		const self = this;
		const messages = self.getTranslations();
		const pluralIndex = self.getPluralForm(n);
		const defaultValue = n > 1 ? plural : singular;

		return messages.hasOwnProperty(singular) && Array.isArray(messages[singular]) && messages[singular][pluralIndex]
			? messages[singular][pluralIndex]
			: defaultValue;
	}

	xgettext(message, context) {
		const self = this;
		const EOT = self.getDelimiter();
		const messages = self.getTranslations();
		const key = context + EOT + message;

		return messages.hasOwnProperty(key) ? messages[key] : message;
	}

	getChildContext() {
		const self = this;
		return {
			gettext: self.gettext,
			xgettext: self.xgettext,
			ngettext: self.ngettext,
		};
	}

	render() {
		return this.props.children;
	}

}

Textdomain.propTypes = {
	catalog: PropTypes.object,
	plural: PropTypes.string,
};

Textdomain.contextTypes = {
	gettext: PropTypes.func,
	ngettext: PropTypes.func,
	xgettext: PropTypes.func,
};

export default Textdomain;