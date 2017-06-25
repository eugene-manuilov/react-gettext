import { Component } from 'react';
import PropTypes from 'prop-types';

class Textdomain extends Component {

	getChildContext() {
		const self = this;
		return {
			gettext: self.gettext,
			xgettext: self.xgettext,
			ngettext: self.ngettext,
			nxgettext: self.nxgettext,
		};
	}

	getTranslations() {
		const { catalog } = this.props;
		return typeof catalog === 'function' ? catalog() : catalog;
	}

	getPluralForm(n) {
		const { plural } = this.props;

		// return 0 if n is not integer
		if (isNaN(parseInt(n, 10))) {
			return 0;
		}

		// if pluralForm is function, use it to get plural form index
		if (typeof plural === 'function') {
			return plural(n);
		}

		// if pluralForm is string and contains only "n", "0-9", " ", "!=?:%+-/*><&|()"
		// characters, then we can "eval" it to calculate plural form
		if (typeof plural === 'string' && !plural.match(/[^n0-9 !=?:%+-/*><&|()]/i)) {
			/* eslint-disable no-new-func */
			const fnc = Function('n', `return ${plural}`);
			/* eslint-enable no-new-func */
			return +fnc(n);
		}

		return 0;
	}

	getDelimiter() {
		return '\u0004'; // End of Transmission (EOT)
	}

	gettext(message) {
		const messages = this.getTranslations();
		return Object.prototype.hasOwnProperty.call(messages, message)
			? messages[message]
			: message;
	}

	ngettext(singular, plural, n) {
		const self = this;
		const messages = self.getTranslations();
		const pluralIndex = self.getPluralForm(n);
		const defaultValue = n > 1 ? plural : singular;

		return Object.prototype.hasOwnProperty.call(messages, singular)
				&& Array.isArray(messages[singular])
				&& messages[singular].length >= pluralIndex
				&& pluralIndex >= 0
			? messages[singular][pluralIndex]
			: defaultValue;
	}

	xgettext(message, context) {
		const self = this;
		const EOT = self.getDelimiter();
		const messages = self.getTranslations();
		const key = context + EOT + message;

		return Object.prototype.hasOwnProperty.call(messages, key)
			? messages[key]
			: message;
	}

	nxgettext(singular, plural, n, context) {
		const self = this;
		const messages = self.getTranslations();
		const pluralIndex = self.getPluralForm(n);
		const defaultValue = n > 1 ? plural : singular;
		const EOT = self.getDelimiter();
		const key = context + EOT + singular;

		return Object.prototype.hasOwnProperty.call(messages, key)
				&& Array.isArray(messages[key])
				&& messages[key].length >= pluralIndex
				&& pluralIndex >= 0
			? messages[key][pluralIndex]
			: defaultValue;
	}

	render() {
		return this.props.children;
	}

}

Textdomain.propTypes = {
	catalog: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.objectOf(PropTypes.string),
	]),
	plural: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
	]),
	children: PropTypes.arrayOf(PropTypes.node),
};

Textdomain.defaultProps = {
	catalog: {},
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
