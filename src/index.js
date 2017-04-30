import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function textdomain(translations, pluralForm) {
	const EOT = '\u0004'; // End of Transmission

	const getTranslations = function () {
		// if translations is function, call it to get translations object,
		// otherwise just use incoming translations object
		return typeof translations === 'function' ? translations() : translations;
	};

	const getPluralForm = (n) => {
		// return 0 if n is not integer
		if (isNaN(parseInt(n, 10))) {
			return 0;
		}

		// if pluralForm is function, use it to get plural form index
		if (typeof pluralForm === 'function') {
			return pluralForm(n);
		}

		// if pluralForm is string and contains only "n", "0-9", " ", "=?:%+-/*><&|"
		// characters, then we can eval it to calculate plural form
		if (typeof pluralForm === 'string' && !pluralForm.match(/[^n0-9 =?:%+-/*><&|]/i)) {
			/* eslint-disable no-eval */
			return +eval(pluralForm.toLowerCase().split('n').join(n));
			/* eslint-enable no-eval */
		}

		return 0;
	};

	// return HOC function
	return (WrappedComponent) => {
		class WithGettext extends Component {
			static gettext(message) {
				const messages = getTranslations();

				return messages[message] ? messages[message] : message;
			}

			static ngettext(singular, plural, n) {
				const messages = getTranslations();
				const pluralIndex = getPluralForm(n);
				const defaultValue = n > 1 ? plural : singular;

				return Array.isArray(messages[singular]) && messages[singular][pluralIndex]
					? messages[singular][pluralIndex]
					: defaultValue;
			}

			static xgettext(message, context) {
				const messages = getTranslations();
				const key = context + EOT + message;

				return messages[key] ? messages[key] : message;
			}

			static nxgettext(singular, plural, n, context) {
				return WithGettext.ngettex(singular, plural, n);
			}

			getChildContext() {
				return {
					gettext: WithGettext.gettext,
					ngettext: WithGettext.ngettext,
					xgettext: WithGettext.xgettext,
					nxgettext: WithGettext.nxgettext
				};
			}

			render() {
				return React.createElement(WrappedComponent, this.props);
			}
		}

		WithGettext.displayName = `WithGettext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

		WithGettext.childContextTypes = {
			gettext: PropTypes.func,
			ngettext: PropTypes.func,
			xgettext: PropTypes.func,
			nxgettext: PropTypes.func
		};

		return hoistNonReactStatic(WithGettext, WrappedComponent);
	};
}
